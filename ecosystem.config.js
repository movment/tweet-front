module.exports = {
  apps: [
    {
      name: 'front',
      script: 'yarn',
      args: 'start',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
