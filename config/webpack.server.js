const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const outputPath = path.join(__dirname, '../packages/server');
const pathToModules = path.join(__dirname, '../node_modules');

const entryPath = path.join(__dirname, '../source/server/index.ts');
const configPath = path.join(__dirname, '../source/server/tsconfig.json');
const sourcePath = path.join(__dirname, '../source/server/');

module.exports = {
    entry: entryPath,
    target: 'node',
    mode: 'development',
    devtool: 'source-map', // Enable source maps for better error info
    externals: [
        nodeExternals({
            modulesDir: pathToModules
        })
    ],
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                configFile: configPath,
            },
        }),
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: false,
                        configFile: configPath,
                    },
                },
                exclude: pathToModules
            }
        ]
    },
    resolve: {
        plugins: [new TsconfigPathsPlugin({ configFile: configPath, baseUrl: sourcePath })],
        extensions: ['.ts', '.tsx', '.js'],
        mainFields: ['main']
    },
    output: {
        path: outputPath,
        filename: 'index.js'
    },
    optimization: {
        minimize: false
    },
    cache: {
        type: 'filesystem',
        buildDependencies: {
            config: [__filename]
        }
    },
};
