import signale from 'signale';
import { pascal, kebab, title } from 'change-case';

import bottle from '../../../container';
import { EXLUDED_TEMPLATES } from '../../../constants/defaults';

export default (inquiry) => new Promise((resolve) => {
    const { Template } = bottle.container;

    const defaultTemplates = Template.collect('plugin');
    const exludedTemplates = EXLUDED_TEMPLATES;

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

    const templates = defaultTemplates.filter(template => !exludedTemplates.includes(template));
    console.log(templates);

    templates.forEach(template => {
        // if (template.includes('Plugin')) {
        //     Template.process(template, context, `${context.plugin.name}.php`);
        //     return;
        // }

        Template.process(template, context);
    });

    signale.success('Created plugin.');

    return resolve();
});
