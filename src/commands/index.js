import registerGeneratePlugin from './plugin-create';

/**
 * Registers all available commands.
 *
 * @param {commander.Command} program
 */
export default (program) => {
    registerGeneratePlugin(program);
};
