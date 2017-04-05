const path = require('path');

module.exports = {
  key: process.env.EXOBOT_KEY || 'points-test',
  plugins: {
    shell: ['@exoplay/exobot', { import: 'adapters.Shell' }],
    points: [path.join(process.cwd(), 'points.js'), { }],
    permissions: ['@exoplay/exobot', { import: 'plugins.Permissions' }],
    config: ['@exoplay/exobot', { import: 'plugins.Config' }],
  },
};
