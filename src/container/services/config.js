import { resolve } from 'path';

export default () => ({
    cwd: process.cwd(),
    outDir: resolve(process.cwd(), 'out'),
    templateDir: resolve(__dirname, '../templates'),
});
