import signale from 'signale';
import { kebab, title, snake } from 'change-case';

import bottle from '../../../container';
import { EXLUDED_TEMPLATES } from '../../../constants/defaults';

export default (inquiry) => new Promise((resolve) => {
    const { Template } = bottle.container;

    const context = {
        type: 'cms-block',
        block: {
            name: kebab(inquiry.meta.name),
            snakeName: snake(inquiry.meta.name),
            titleName: title(inquiry.meta.name),
        },
    };

    const defaultTemplates = Template.collect('cms-block');
    const exludedTemplates = EXLUDED_TEMPLATES;
    const templates = defaultTemplates.filter(template => !exludedTemplates.includes(template));

    templates.forEach(template => {
        Template.process(
            template,
            undefined,
            context,
        );
    });

    signale.success('Created block.');

    return resolve();
});
