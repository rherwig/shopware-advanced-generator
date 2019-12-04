import { resolve } from 'path';

export default () => {
    return {
        cwd: process.cwd(),
        outDir: resolve(process.cwd(), 'out'),
        templateDir: resolve(__dirname, '../templates'),
    };
};
