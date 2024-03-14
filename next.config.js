const withPlugins = require('next-compose-plugins');
const withSvgr = require('next-plugin-svgr');

const nextConfig = {
    swcMinify: true,
    compiler: {
        emotion: true,
    },
    trailingSlash: true,
    reactStrictMode: true,
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.hhcdn.ru',
                port: '',
                pathname: '/employer-logo-original/**',
            },
        ],
    },
};

const config = withPlugins(
    [
        withSvgr({
            svgrOptions: {
                svgo: false,
                titleProp: true,
            },
        }),
    ],
    nextConfig
);

module.exports = (phase, { defaultConfig }) => {
    delete defaultConfig.webpack5;
    delete defaultConfig.webpackDevMiddleware;
    delete defaultConfig.configOrigin;
    delete defaultConfig.target;

    return config(phase, { defaultConfig });
};
