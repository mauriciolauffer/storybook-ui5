// tslint:disable-next-line: no-var-requires
import { LoadOptions } from '@storybook/core-common';
const packageJson = require('../../package.json');

export default {
  packageJson,
  framework: 'ui5',
  frameworkPath: 'storybook-ui5/dist/client/index.js',
  frameworkPresets: [require.resolve('./framework-preset-ui5.js')]
} as LoadOptions;
