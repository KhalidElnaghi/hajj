const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

module.exports = withNextIntl({
  env: {
    NEXT_PUBLIC_HOST_API: process.env.HOST_API,
  },
  images: {
    remotePatterns: [
      ...(process.env.IMAGE_DOMAIN
        ? [
            {
              protocol: 'https',
              hostname: process.env.IMAGE_DOMAIN,
            },
            {
              protocol: 'http',
              hostname: process.env.IMAGE_DOMAIN,
            },
          ]
        : []),
    ],
    unoptimized: true,
  },
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
    '@mui/lab': {
      transform: '@mui/lab/{{member}}',
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    config.module.rules.push({
      test: /\.(mp3)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/sounds/',
          outputPath: 'static/sounds/',
          name: '[name].[ext]',
          esModule: false,
        },
      },
    });
    return config;
  },
  // Empty turbopack config to silence the warning
  // This allows webpack config to be used when --webpack flag is passed
  turbopack: {},
});
