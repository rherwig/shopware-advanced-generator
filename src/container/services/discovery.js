import { join } from 'path';
import { existsSync } from 'fs';

const isPluginsDir = (path = process.cwd()) => {
    return path.endsWith(join('custom', 'plugins'));
};

const isProjectRoot = () => {
    return existsSync(join(process.cwd(), 'custom', 'plugins'));
};

const getPluginsDir = () => {
    if (!isProjectRoot()) {
        throw new Error('Path custom/plugins could not be found.');
    }

    return join(process.cwd(), 'custom', 'plugins');
};

export default () => {
    return {
        isProjectRoot,
        isPluginsDir,
        getPluginsDir,
    };
};
