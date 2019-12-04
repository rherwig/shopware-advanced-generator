import Bottle from 'bottlejs';
import mock from 'mock-fs';

import Discovery from './discovery';

describe('discovery service', () => {
    let bottle = new Bottle();

    beforeAll(() => {
        mock({
            '/var/test': {
                'custom': {
                    'plugins': {},
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
});
