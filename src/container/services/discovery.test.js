import Bottle from 'bottlejs';
import mock from 'mock-fs';
import { join, resolve } from 'path';

import Discovery from './discovery';

describe('discovery service', () => {
    const bottle = new Bottle();

    beforeAll(() => {
        mock({
            '/var/test': {
                custom: {
                    plugins: {},
                },
                test: {
                    'composer.json': JSON.stringify({
                        type: 'shopware-platform-plugin',
                    }),
                },
            },
        }, {
            createCwd: false,
        });

        bottle.service('Discovery', Discovery);
    });

    afterAll(() => {
        mock.restore();
    });

    it('it can register', () => {
        expect(bottle.container.Discovery).toBeDefined();
    });

    it('contains getPluginsDir function', () => {
        expect(typeof bottle.container.Discovery.getPluginsDir).toBe('function');
    });

    it('checks if cwd is project root', () => {
        const isProjectRoot = bottle.container.Discovery.isProjectRoot();

        expect(isProjectRoot).toBe(true);
    });

    it('checks if cwd is plugin dir', () => {
        const isPluginsDir = bottle.container.Discovery.isPluginsDir();

        expect(isPluginsDir).toBe(false);
    });

    it('returns plugin dir', () => {
        const pluginsDir = bottle.container.Discovery.getPluginsDir();
        const isPluginsDir = bottle.container.Discovery.isPluginsDir(pluginsDir);

        expect(isPluginsDir).toBe(true);
    });

    it('contains isPluginDir function', () => {
        expect(typeof bottle.container.Discovery.isPluginDir).toBe('function');
    });

    it('detects plugin dir', () => {
        const isPluginDir = bottle.container.Discovery.isPluginDir(
            join(process.cwd(), 'test'),
        );

        expect(isPluginDir).toBe(true);
    });
});
