/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

// plugins
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

function resolvePathsFromTsConfig({
    tsconfigPath = './tsconfig.json',
    webpackConfigBasePath = __dirname,
} = {}) {
    console.log('here');
    console.log(webpackConfigBasePath);
    const { paths, baseUrl } = require(tsconfigPath).compilerOptions;

    console.log({ paths: paths });

    const aliases = {};

    Object.keys(paths).forEach((item) => {
        const key = item.replace('/*', '');
        const value = paths[item].map((pattern) =>
            path.resolve(
                webpackConfigBasePath,
                baseUrl,
                pattern.replace('/*', '').replace('*', '')
            )
        );

        aliases[key] = value;
    });

    return aliases;
}

const ROOT_DIR = process.cwd();

module.exports = {
    entry: path.join(__dirname, 'src', 'index.tsx'),
    output: {
        path: path.resolve(__dirname, 'dist'),
    },

    devServer: {
        port: 3000,

        proxy: {
            '/api': {
                secure: false,
                changeOrigin: true,
                cookieDomainRewrite: 'localhost',
                target: 'http://localhost:9000',
                pathRewrite: { '^/api': '' },
            },
        },
    },

    devtool: 'source-map',

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s?css$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    { loader: 'css-loader', options: { modules: true } },
                    // Compiles Sass to CSS
                    'sass-loader',
                    'postcss-loader',
                ],
            },
        ],
    },
    resolve: {
        alias: resolvePathsFromTsConfig({
            tsconfigPath: path.resolve(ROOT_DIR, 'tsconfig.json'),
            webpackConfigBasePath: path.resolve(ROOT_DIR),
        }),
        extensions: ['.tsx', '.ts', '.js', '.scss', '.css', '.jsx'],
        // fallback: {
        //     https: false,
        // },
    },
    plugins: [
        new ESLintPlugin({
            fix: true,
            formatter: 'html',
            extensions: ['js', 'jsx', 'ts', 'tsx'],
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
        }),
        new NodePolyfillPlugin(),
    ],
};
