import inquireMeta from './meta';

export default async () => {
    const meta = await inquireMeta();

    return {
        meta,
    };
};
