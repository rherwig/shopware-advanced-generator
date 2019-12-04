import { Command } from 'commander';

import pkg from '../package.json';
import registerCommands from './commands';

const program = new Command();

registerCommands(program);

program
    .version(pkg.version)
    .parse(process.argv);

export default program;
