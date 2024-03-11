const Encore = require("@symfony/webpack-encore");

// Manually configure the runtime environment if not already configured yet by the "encore" command.
if (!Encore.isRuntimeEnvironmentConfigured()) {
  Encore.configureRuntimeEnvironment(process.env.NODE_ENV || "dev");
}

Encore.setOutputPath("public/build/")
  .setPublicPath("/build")

  // L'entrée pour app.js est déjà là
  .addEntry("app", "./assets/app.js")

  // Ajoute une nouvelle entrée pour ton fichier dashboard.scss
  .addStyleEntry("dashboard", "./assets/styles/dashboard.scss")

  .splitEntryChunks()
  .enableSingleRuntimeChunk()
  .cleanupOutputBeforeBuild()
  .enableBuildNotifications()
  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning(Encore.isProduction())
  .configureBabelPresetEnv((config) => {
    config.useBuiltIns = "usage";
    config.corejs = "3.23";
  })
  .enableSassLoader()
  .enableStimulusBridge("./assets/controllers.json");

module.exports = Encore.getWebpackConfig();
