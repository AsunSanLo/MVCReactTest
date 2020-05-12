# Crear un widget React con TypeScript

## 1. Crear un proyecto nuevo

1.1. Crear un nuevo proyecto con la plantilla Create React App

`npx create-react-app [nombre-widget] --template typescript`

*Nota: Si el proyecto se crea vacío (sólo node_modules y package.json) es un bug de la plantilla de React. Actualmente la versión que funciona es 3.4.0*

## 2. Adaptar la configuración de webpack

2.1. Si tenemos control de versiones, hay que hacer **commit** antes de continuar


2.2. Ejecutar el comando **eject** para poder modificar la configuración de webpack

`npm run eject`

2.3. Para conservar la configuración original, renombrar el fichero webpack.config.js a **webpack.config.default.js**

2.4. Crear un nuevo fichero **webpack.config.js** en la misma ruta, de manera que dentro de config/ tendríamos:

        - webpack.config.default.js
        - webpack.config.js

2.5. Copiar el siguiente código en **webpack.config.js**

```
'use strict';

const basePath = '[PATH_TO_YOUR_WIDGET_BUILD]'; //ex: '/ReactAp/ts-sample-widget/build/'
const defaultConfig = require('./webpack.config.default.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = mode => {

  //Loads default CRA webpack configuration
  const config = defaultConfig(mode);


  //Config to generate the bundled css without hash
  config.plugins.push(new MiniCssExtractPlugin({
    filename: 'static/css/[name].css',
    chunkFilename: 'static/css/[name].chunk.css',
    ignoreOrder: false,
  }));

  //Config to generate the bundled js without hash
  config.output.chunkFilename = "static/js/[name].chunk.js";
  config.output.filename = 'static/js/bundle.js',


  //Config to avoid including react js inside the bundle
  config.externals = config.externals || {};
  config.externals.react = "React";

  //Config to set the base path to load media resources along the code 
  config.module.rules.forEach(topRule => {
    if (topRule.oneOf) {
      topRule.oneOf.forEach(rule => {
        if (rule.loader && rule.loader.indexOf('url-loader') !== -1) {
          rule.test.push(/\.svg$/);
          rule.test.push(/\.woff$/);
          rule.options.publicPath = basePath
        }
      })
    }
  });
  return config;
};
```


## 3. Configurar auto build al cambiar ficheros

3.1. Instalar los paquetes necesarios para que se realice la compilación automáticamente al cambiar ficheros.

`npm install onchange npm-run-all`

3.2. Modificar la sección de scripts del fichero **package.json** para que quede de la siguiente manera:

```
  "scripts": {
    "start": "npm-run-all -p onchange:build start:cra",
    "onchange:build": "onchange \"src/**/*\" -- npm run build",
    "start:cra": "node scripts/start.js",
    "build": "node scripts/build.js",
    "test": "node scripts/test.js"
  },
```