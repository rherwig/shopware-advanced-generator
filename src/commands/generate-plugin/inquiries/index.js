import inquireMeta from './meta';
import inquireFeatures from './features';

export default async () => {
    const meta = await inquireMeta();
    const features = await inquireFeatures();

    return {
        meta,
        features,
    };
};
