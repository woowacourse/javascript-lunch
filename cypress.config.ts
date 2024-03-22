import { defineConfig } from 'cypress';

const path = require('path');
const webpackPreprocessor = require('@cypress/webpack-preprocessor');

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on(
        'file:preprocessor',
        webpackPreprocessor({
          webpackOptions: {
            resolve: {
              extensions: ['.ts', '.js', '.mjs'],
              alias: {
                '@': path.resolve(__dirname, './src'),
              },
            },
            module: {
              rules: [
                {
                  test: /\.(js|mjs|ts)$/i,
                  exclude: /node_modules/,
                  use: {
                    loader: 'ts-loader',
                  },
                },
                {
                  test: /\.css$/i,
                  use: ['style-loader', 'css-loader'],
                },
                {
                  test: /\.(png|svg|jpg|jpeg|gif)$/i,
                  loader: 'file-loader',
                  options: {
                    name: '[name].[ext]',
                    outputPath: 'images/',
                  },
                },
              ],
            },
          },
        }),
      );
    },
  },
});
