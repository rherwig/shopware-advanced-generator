import signale from 'signale';

import inquire from './inquiries';
import generate from './core';
import bottle from '../../container';

const action = async () => {
    const { Discovery } = bottle.container;

    if (!Discovery.isPluginDir()) {
        throw new Error('Please execute the command from the root directory of your plugin.');
    }

    const inquiry = await inquire();
    return generate(inquiry);
};

/**
 * Command to generate a boilerplate plugin.
 *
 * @param {commander.Command} program
 */
export default (program) => {
    program
        .command('cms:block:create')
        .description('Create a new CMS block')
        .action(async () => {
            try {
                await action();
            } catch (err) {
                signale.error(err.message);
            }
        });
};
