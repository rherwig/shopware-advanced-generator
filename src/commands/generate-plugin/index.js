import inquire from './inquiries';
import generatePlugin from './core';

const action = async () => {
    const inquiry = await inquire();
    return await generatePlugin(inquiry);
};

/**
 * Command to generate a boilerplate plugin.
 *
 * @param {commander.Command} program
 */
export default (program) => {
    program
        .command('create-plugin')
        .description('Create a new Shopware 6 plugin')
        .action(async () => {
            return await action();
        });
};
