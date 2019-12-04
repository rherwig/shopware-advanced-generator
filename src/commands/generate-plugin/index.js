import signale from 'signale';

import inquire from './inquiries';
import generatePlugin from './core';
import bottle from '../../container';

const action = async () => {
    const { Discovery } = bottle.container;

    if (!Discovery.isProjectRoot()) {
        throw new Error('Please execute the command from the root directory of your project.');
    }

    const inquiry = await inquire();
    return generatePlugin(inquiry);
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
            try {
                await action();
            } catch (err) {
                signale.error(err.message);
            }
        });
};
