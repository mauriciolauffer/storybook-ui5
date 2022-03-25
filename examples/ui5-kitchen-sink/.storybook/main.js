module.exports = {
  stories: ['../stories'],
  staticDirs: ['../components'],
  framework: 'storybook-ui5',
  features: {
    postcss: false,
  },
  core: {
    builder: 'webpack5',
  }
};
