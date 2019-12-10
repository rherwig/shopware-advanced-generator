import { join } from 'path';
import { existsSync, readFileSync } from 'fs';
import { COMPOSER_TYPE } from '../../constants/defaults';

const isPluginDir = (path = process.cwd()) => {
    const composerJson = join(path, 'composer.json');
    if (!existsSync(composerJson)) {
        return composerJson;
    }

    try {
        const composer = JSON.parse(readFileSync(composerJson, 'utf-8'));

        return composer.type && composer.type === COMPOSER_TYPE;
    } catch (err) {
        return false;
    }
};

const isPluginsDir = (path = process.cwd()) => path.endsWith(join('custom', 'plugins'));

const isProjectRoot = () => existsSync(join(process.cwd(), 'custom', 'plugins'));

const getPluginsDir = () => {
    if (!isProjectRoot()) {
        throw new Error('Path custom/plugins could not be found.');
    }

    return join(process.cwd(), 'custom', 'plugins');
};

export default () => ({
    isProjectRoot,
    isPluginDir,
    isPluginsDir,
    getPluginsDir,
});
