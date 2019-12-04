import Bottle from 'bottlejs';
import mock from 'mock-fs';
import { resolve } from 'path';
import { existsSync, readFileSync } from 'fs';

import Template from './template';

describe('file service', () => {
    let bottle = new Bottle();

    const templateDir = resolve(__dirname, 'templates');
    const outDir = resolve(__dirname, 'out');

    beforeAll(() => {
        mock({
            [templateDir]: {
                'plugin': {
                    'template.vm': '$content',
                    'template-2.vm': '$content',
                },
            },
            [outDir]: {
                'custom': {
                    'plugins': {},
                },
            },
        });

        bottle.service('Config', () => ({
            templateDir,
            outDir,
        }));

        bottle.service('Discovery', () => ({
            getPluginsDir() {
                return resolve(outDir, 'custom/plugins');
            },
        }));

        bottle.service('Template', Template, 'Config', 'Discovery');
    });

    afterAll(() => {
        mock.restore();
    });

    it('it can register', () => {
        expect(bottle.container.Template).toBeDefined();
    });

    it('has copy function', () => {
        expect(typeof bottle.container.Template.copy).toBe('function');
    });

    it('copies files', () => {
        const { copy } = bottle.container.Template;
        const src = resolve(templateDir, 'plugin', 'template.vm');
        const dest = resolve(outDir, 'template');

        copy(src, dest);

        expect(existsSync(dest)).toBe(true);
    });

    it('applies middleware during copy', () => {
        const { copy } = bottle.container.Template;
        const src = resolve(templateDir, 'plugin', 'template.vm');
        const dest = resolve(outDir, 'template');

        const middleware = (content) => {
            return `${content}!`;
        };

        copy(src, dest, [ middleware ]);

        const endsWithExclamation = readFileSync(
            dest,
            'utf-8',
        ).endsWith('!');

        expect(endsWithExclamation).toBe(true);
    });

    it('has process function', () => {
        expect(typeof bottle.container.Template.process).toBe('function');
    });

    it('copies and processes files', () => {
        const { process } = bottle.container.Template;

        process('template', {
            type: 'plugin',
            content: 'template',
            plugin: {
                name: 'Test',
                vendor: 'Vendor',
            },
        });

        const isProcessed = readFileSync(
            resolve(outDir, 'custom/plugins/VendorTest/template'),
            'utf-8',
        ).includes('template');

        expect(isProcessed).toBe(true);
    });

    it('has collect method', () => {
        expect(typeof bottle.container.Template.collect).toBe('function');
    });

    it('collects all template files', () => {
        const files = bottle.container.Template.collect('plugin');

        expect(files).toEqual(['template-2', 'template']);
    });
});
