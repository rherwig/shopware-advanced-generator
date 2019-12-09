import Bottle from 'bottlejs';

import registerServices from './index';

describe('register services', () => {
    const bottle = new Bottle();

    beforeAll(() => {
        registerServices(bottle);
    });

    it('contains config service', () => {
        expect(bottle.container.Config).toBeDefined();
    });

    it('contains template service', () => {
        expect(bottle.container.Template).toBeDefined();
    });

    it('contains dicovery service', () => {
        expect(bottle.container.Discovery).toBeDefined();
    });

    it('contains manifest service', () => {
        expect(bottle.container.Manifest).toBeDefined();
    });
});
