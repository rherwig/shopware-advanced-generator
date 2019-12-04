import { resolve } from 'path';

import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';

const shebang = () => ({
    name: 'shebang',
    renderChunk(code) {
        return `#!/usr/bin/env node\n${code}`;
    },
});

export default {
    input: resolve(__dirname, 'src/index.js'),
    output: {
        file: 'lib/swag.js',
        format: 'cjs',
    },
    plugins: [
        babel({
            exclude: 'node_modules/**',
            runtimeHelpers: true,
        }),
        commonjs(),
        json(),
        nodeResolve({
            browser: true,
        }),
        shebang(),
    ],
};
