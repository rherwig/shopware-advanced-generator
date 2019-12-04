import signale from 'signale';
import { pascal, kebab, title } from 'change-case';

import bottle from '../../../container';

export default (inquiry) => new Promise(async (resolve, reject) => {
    const { Template } = bottle.container;

    const defaultTemplates = Template.collect('plugin');
    const exludedTemplates = [];

    // TODO: Acquire the values via commander
    // const inquiry = {
    //     include: {
    //         styleLint: features.styleLint.include,
    //     },
    // };

    // if (!inquiry.include.styleLint) {
    //     exludedTemplates.push(...features.styleLint.exclude);
    // }

    const context = {
        type: 'plugin',
        composer: {
            vendor: kebab(inquiry.meta.vendor),
            name: kebab(inquiry.meta.name),
        },
        plugin: {
            vendor: pascal(inquiry.meta.vendor),
            name: pascal(inquiry.meta.name),
            description: title(inquiry.meta.description),
            author: title(inquiry.meta.author),
        },
    };

    const templates = defaultTemplates.filter(template =>
        !exludedTemplates.includes(template)
    );

    templates.forEach(template => {
        if (template.includes('Plugin')) {
            Template.process(template, context, `${context.plugin.name}.php`);
            return;
        }

        console.log(template);

        Template.process(template, context);
    });

    signale.success('Created plugin.');

    return resolve();
});
