import Bottle from 'bottlejs';

import registerServices from './index';

describe('register services', () => {
    let bottle = new Bottle();

    beforeAll(() => {
        registerServices(bottle);
    });

    it('contains config service', () => {
        expect(bottle.container.Config).toBeDefined();
    });

    it('contains template service', () => {
        expect(bottle.container.Template).toBeDefined();
    });
});
