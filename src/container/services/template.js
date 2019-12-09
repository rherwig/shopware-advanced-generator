import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname, basename } from 'path';
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
    const contents = middlewares.reduce((result, middlware) => middlware(result), readFileSync(src, 'utf-8'));

    writeFileSync(dest, contents, 'utf-8');
};

/**
 * Copies a template while processing it using Velocity.
 *
 * @param Config
 * @param Discovery
 * @returns {Function}
 */
const process = (Config, Discovery, Manifest) => (file, context = {}, name = undefined) => {
    const templateMiddleware = (contents) => Velocity.render(contents, context);

    const manifest = Manifest.parse(context.type, context);
    const pluginName = context.plugin.vendor + context.plugin.name;
    const fileName = manifest ? manifest.files[file] || file : file;

    console.log('file', file);
    console.log('manifest', manifest);

    const src = resolve(Config.templateDir, context.type, `${file}.vm`);
    const dest = resolve(Discovery.getPluginsDir(), pluginName, fileName);

    const destDir = dirname(dest);
    if (!existsSync(destDir)) {
        mkdirp.sync(destDir);
    }

    copy(src, dest, [templateMiddleware]);
};

/**
 * Collects and returns all template file paths.
 *
 * @returns {Array<string>} Template file paths
 */
const collect = (Config) => (root = '') => glob.sync(['**/*.vm'], {
    cwd: resolve(Config.templateDir, root),
    dot: true,
}).map(path => path.replace(/\.vm$/, ''));

export default (Config, Discovery, Manifest) => ({
    copy,
    process: process(Config, Discovery, Manifest),
    collect: collect(Config),
});
