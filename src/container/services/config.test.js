import Bottle from 'bottlejs';

import Config from './config';

describe('config service', () => {
    const bottle = new Bottle();

    beforeAll(() => {
        bottle.service('Config', Config);
    });

    it('it can register', () => {
        expect(bottle.container.Config).toBeDefined();
    });

    it('contains cwd', () => {
        expect(bottle.container.Config.cwd).toBe(process.cwd());
    });
});
