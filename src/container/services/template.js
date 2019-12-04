import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname, basename, sep } from 'path';
import Velocity from 'velocityjs';
import glob from 'glob-all';
import mkdirp from 'mkdirp';

/**
 * Copies a file from source to destination and applies middlewares,
 * that can transform the contents of the source file before saving it
 * the the destination.
 *
 * @param src {string} Source path
 * @param dest {string} Destination path
 * @param middlewares {Array<Function<string>>} Middleware functions
 */
const copy = (src, dest, middlewares = []) => {
    const contents = middlewares.reduce((result, middlware) => {
        return middlware(result);
    }, readFileSync(src, 'utf-8'));

    writeFileSync(dest, contents, 'utf-8');
};

/**
 * Copies a template while processing it using Velocity.
 *
 * @param Config
 * @param Discovery
 * @returns {Function}
 */
const process = (Config, Discovery) => (file, context = {}, name = undefined) => {
    const templateMiddleware = (contents) => {
        return Velocity.render(contents, context);
    };

    const pluginName = context.plugin.vendor + context.plugin.name;
    const src = resolve(Config.templateDir, context.type, `${file}.vm`);
    const dest = resolve(Discovery.getPluginsDir(), pluginName, file);

    const destFile = basename(dest);
    const destDir = dirname(dest);
    if (!existsSync(destDir)) {
        mkdirp.sync(destDir);
    }

    const _dest = name ? resolve(destDir, name) : resolve(destDir, destFile);

    copy(src, _dest, [ templateMiddleware ]);
};

/**
 * Collects and returns all template file paths.
 *
 * @returns {Array<string>} Template file paths
 */
const collect = (Config) => (root = '') => {
    return glob.sync(['**/*.vm'], {
        cwd: resolve(Config.templateDir, root),
        dot: true,
    }).map(path => path.replace(/\.vm$/, ''));
};

export default (Config, Discovery) => {
    return {
        copy,
        process: process(Config, Discovery),
        collect: collect(Config),
    };
};
