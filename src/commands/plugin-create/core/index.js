import signale from 'signale';
import { pascal, kebab, title } from 'change-case';
import { join } from 'path';

import bottle from '../../../container';
import { EXLUDED_TEMPLATES } from '../../../constants/defaults';

export default (inquiry) => new Promise((resolve) => {
    const { Template, Discovery } = bottle.container;

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

    const defaultTemplates = Template.collect('plugin');
    const exludedTemplates = EXLUDED_TEMPLATES;
    const templates = defaultTemplates.filter(template => !exludedTemplates.includes(template));
    const pluginName = context.plugin.vendor + context.plugin.name;

    templates.forEach(template => {
        Template.process(
            template,
            join(Discovery.getPluginsDir(), pluginName),
            context,
        );
    });

    signale.success('Created plugin.');

    return resolve();
});
