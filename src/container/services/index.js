import Config from './config';
import Discovery from './discovery';
import Manifest from './manifest';
import Template from './template';

export default (bottle) => {
    bottle.service('Config', Config);
    bottle.service('Discovery', Discovery, 'Config');
    bottle.service('Manifest', Manifest, 'Config');
    bottle.service('Template', Template, 'Config', 'Discovery', 'Manifest');
};
