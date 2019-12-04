import Bottle from 'bottlejs';

import di from './index';

describe('bottle', () => {
    it('is instance of Bottle', () => {
        expect(di).toBeInstanceOf(Bottle);
    });
});
