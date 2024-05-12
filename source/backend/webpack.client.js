const path = require('path');
const fs = require('fs');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const dotenv = require('dotenv');
dotenv.config();


const outputPath = path.join(__dirname, '../../client_packages');

const pathToModules = path.join(__dirname, '../source/backend/node_modules');

const entryPath = path.join(__dirname, './client/index.ts');
const configPath = path.join(__dirname, './client/tsconfig.json');
const sourcePath = path.join(__dirname, './client');
console.log(outputPath);

module.exports = {
    entry: {
        app: entryPath
    },
    target: 'node',
    mode: 'development',
    plugins: [
        // new obf({ rotateStringArray: true, reservedStrings: ['\s*'] }, [])
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: pathToModules
            }
        ]
    },
    resolve: {
        plugins: [new TsconfigPathsPlugin({ configFile: configPath, baseUrl: sourcePath })],
        extensions: ['.ts', '.js'],
        mainFields: ['main']
    },
    output: {
        path: outputPath,
        filename: '[name].js',
        chunkFilename: '[name].bundle.js'
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
};
