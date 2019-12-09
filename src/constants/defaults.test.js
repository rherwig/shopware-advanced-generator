import * as defaults from './defaults';

describe('defaults', () => {
    it('exposes excluded templates', () => {
        expect(defaults.EXLUDED_TEMPLATES).toBeDefined();
    });

    it('excludes swag.json.vm', () => {
        expect(defaults.EXLUDED_TEMPLATES).toContain(defaults.CONFIG_FILE);
    });
});
