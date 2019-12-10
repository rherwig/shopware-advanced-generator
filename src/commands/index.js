import registerPluginCreate from './plugin-create';
import registerCmsBlockCreate from './cms-block-create';

/**
 * Registers all available commands.
 *
 * @param {commander.Command} program
 */
export default (program) => {
    registerPluginCreate(program);
    registerCmsBlockCreate(program);
};
