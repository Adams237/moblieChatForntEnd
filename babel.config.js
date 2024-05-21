module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
     plugins: [
      'react-native-reanimated/plugin' // Assurez-vous d'ajouter cette ligne pour le plugin
    ]
  };
};
