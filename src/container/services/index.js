import Config from './config';
import Discovery from './discovery';
import Template from './template';

export default (bottle) => {
    bottle.service('Config', Config);
    bottle.service('Discovery', Discovery, 'Config');
    bottle.service('Template', Template, 'Config', 'Discovery');
};
