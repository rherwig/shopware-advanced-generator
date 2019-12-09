import Bottle from 'bottlejs';
import mock from 'mock-fs';
import { resolve } from 'path';

import Manifest from './manifest';

describe('manifest service', () => {
    const bottle = new Bottle();

    const templateDir = resolve(__dirname, 'templates');
    const outDir = resolve(__dirname, 'out');

    beforeAll(() => {
        mock({
            [templateDir]: {
                plugin: {
                    'swag.json.vm': JSON.stringify({
                        files: {
                            'src/Plugin.php.vm': 'src/${plugin.name}.php',
                        },
                    }),
                },
            },
            [outDir]: {
                custom: {
                    plugins: {},
                },
            },
        });

        bottle.service('Config', () => ({
            templateDir,
            outDir,
        }));

        bottle.service('Manifest', Manifest, 'Config');
    });

    afterAll(() => {
        mock.restore();
    });

    it('it can register', () => {
        expect(bottle.container.Manifest).toBeDefined();
    });

    it('has parse function', () => {
        expect(typeof bottle.container.Manifest.parse).toBe('function');
    });

    it('parses manifest', () => {
        const manifest = bottle.container.Manifest.parse('plugin', {
            plugin: {
                name: 'Test',
            },
        });

        expect(manifest.files['src/Plugin.php.vm']).toBe('src/Test.php');
    });
});
