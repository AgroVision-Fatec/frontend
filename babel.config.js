module.exports = function(api) {
  api.cache(true);
  return {
    ignore: ["*"],
    presets: ['babel-preset-expo'],
  };
};
