module.exports = function override(config, env) {
  // Отключаем source map для node_modules
  config.module.rules.forEach((rule) => {
    if (
      rule.use &&
      rule.use[0] &&
      rule.use[0].loader &&
      rule.use[0].loader.includes("source-map-loader")
    ) {
      rule.exclude = /node_modules/;
    }
  });
  return config;
};
