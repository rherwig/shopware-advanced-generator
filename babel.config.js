module.exports = api => {
    api.cache(true);

    const presets = [
        require('@babel/preset-env'),
    ];

    const plugins = [
        [require('@babel/plugin-transform-runtime'), {
            regenerator: true,
        }],
    ];

    return {
        presets,
        plugins,
    };
};
