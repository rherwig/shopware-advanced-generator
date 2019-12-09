import { join } from 'path';
import { existsSync, readFileSync } from 'fs';
import Velocity from 'velocityjs';

import { CONFIG_FILE_TEMPLATE } from '../../constants/defaults';

const parse = (Config) => (type, context) => {
    const manifestPath = join(Config.templateDir, type, CONFIG_FILE_TEMPLATE);
    if (!existsSync(manifestPath)) {
        return {};
    }

    const manifestTemplate = readFileSync(manifestPath, 'utf-8');
    const manifest = Velocity.render(manifestTemplate, context);

    return JSON.parse(manifest);
};

export default (Config) => ({
    parse: parse(Config),
});
