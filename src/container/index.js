import Bottle from 'bottlejs';

import registerServices from './services';

const bottle = new Bottle();

registerServices(bottle);

export default bottle;
