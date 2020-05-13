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


*Nota: Es posible que haya que cambiar la variable basePath según las referencias que se incluyan en el proyecto a recursos como iconos, fuentes, etc. En casos más complejos he tenido que poner en basePath la ruta completa a la build, por ejemplo '/ReactAp/ts-sample-widget/build/'*

*Nota 2: En esta configuración se está incluyendo React dentro del widget. Para optimizarlo, se puede configurar como external y referenciar a la librería desde fuera de los widgets. Esa configuración son las líneas 27 y 28 del siguiente código, que están actualmente comentadas.*

```javascript
'use strict';

const basePath = '';
const defaultConfig = require('./webpack.config.default.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = mode => {

  //Loads default CRA webpack configuration
  const config = defaultConfig(mode);

  if (mode === 'development') return config;

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
  //config.externals = config.externals || {};
  //config.externals.react = "React";

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

```json
  "scripts": {
    "start": "npm-run-all -p onchange:build start:cra",
    "onchange:build": "onchange \"src/**/*\" -- npm run build",
    "start:cra": "node scripts/start.js",
    "build": "node scripts/build.js",
    "test": "node scripts/test.js"
  },
```

## 4. Configuración borrado build (opcional)

La build de CRA borra y crea todos los ficheros cada vez que se ejecuta. Esto tiene un comportamiento de reseteo de servidor en SiteFinity, que si no se puede evitar desde configuración de servidor se puede solventar desde Front evitando el borrando y configurando sólo sobreescritura de ficheros generados. Para ello:

4.1 Modificar el fichero **build.js** para omitir la línea de borrado de build. Esto es comentar la línea 61:

```javascript
58  .then(previousFileSizes => {
59    // Remove all content but keep the directory so that
60    // if you're in it, you don't end up in Trash
61   // fs.emptyDirSync(paths.appBuild); // ESTA ES LA LÍNEA QUE COMENTAR
62  // Merge with the public folder
63    copyPublicFolder();
64    // Start the webpack build
65  return build(previousFileSizes);
66  })
```` 

4.2 Para tener una vía rápida de limpiado de build, creamos un nuevo script que simplemente haga el borrado. Para ello, creamos un nuevo fichero en la carpeta de scripts llamado **clearBuild.js** con el siguiente código:

```javascript
const fs = require('fs-extra');
const paths = require('../config/paths');
fs.emptyDirSync(paths.appBuild);
```` 

Y lo añadimos a los scripts del package.json. Aquí además lo añado al comando de start para que cada vez que levantemos el proyecto se limpie la build anterior. 

```json
  "scripts": {
    "start": "npm-run-all -p clear build onchange:build start:cra",
    "onchange:build": "onchange \"src/**/*\" -- npm run build",
    "start:cra": "node scripts/start.js",
    "build": "node scripts/build.js",
    "test": "node scripts/test.js",
    "clear": "node scripts/clearBuild.js"
  }
```

## 5. Añadir el bundle en un widget de SF

En el **.cshtml** del widget MVC, hay que incluir un elemento con el id que utilicemos en el **index.tsx** para pintar la app. También se deben incluir las referencias a todos los js y css generados por la build, indicando la ruta completa de donde está incluido nuestro widget en la solución:

```html

    <div id="root"></div>
    <script src="~/ResourcePackages/ReactWidgets/ts-sample-widget/build/static/js/bundle.js"></script>
    <script src="~/ResourcePackages/ReactWidgets/ts-sample-widget/build/static/js/2.chunk.js"></script>
    <script src="~/ResourcePackages/ReactWidgets/ts-sample-widget/build/static/js/main.chunk.js"></script>
    <link href="~/ResourcePackages/ReactWidgets/ts-sample-widget/build/static/css/main.chunk.css" rel="stylesheet">
```