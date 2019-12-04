import registerGeneratePlugin from './generate-plugin';

/**
 * Registers all available commands.
 *
 * @param {commander.Command} program
 */
export default (program) => {
    registerGeneratePlugin(program);
};
