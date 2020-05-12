# MVC - REACT TEST

Prueba para integrar una página de React en un proyecto de .Net MVC. También incluye una prueba para utilizar otro proyecto de React como dll para compartir código entre proyectos.

## Estructura de carpetas

* MVCTest - Proyecto de .Net MVC. Dentro tiene una carpeta ReactApp con el código de aplicación de Front

    - ReactApp - Código para aplicación (widgets) de Front
        - sample-widget - Ejemplo de uso con la configuración necesaria.
        - sample-with-dll - Ejemplo utilizando el código de tipo dll del otro proyecto

* MVCTest_Dll - Aplicación Front con React con ejemplo de código y componentes para ser reutilizados entre diferentes proyectos

## Configuración de un nuevo widget

[Ver este Readme](MVCTest/MVCTest/ReactApp/ts-sample-widget/README.md) para seguir los pasos de creación de un nuevo widget con React y TypeScript 

## Descripción técnica

La solución Front está en una carpeta dentro de la solución MVC para que pueda ser fácilmente referenciada. Ha sido creada con la plantilla create-react-app sin TypeScript. Para que funcione el caso de uso son necesarias dos cosas que no funcionan simplemente con la plantilla:
- Poder probar los cambios en desarrollo sin necesidad de crear manualmente bundle o despliegues 
- Que funcionen las referencias (urls) que haya en el código a recursos como iconos o ficheros css.

Para ello, se han tenido que realizar algunas configuraciones de webpack. Se describe aquí el funcionamiento completo:
1. En el cshtml de MVC se referencia el bundle js y el bundle css con todo el código del widget hecho en Front-End.

    El bundle generado por defecto tiene un código hash que cambia con cada generación y por tanto, cada vez que se genere el bundle, hay que actualizar la referencia en el cshtml. Para evitar esto, se ha cambiado configuración de webpack para no añadir ese hash y que el bundle generado tenga siempre el mismo nombre.
    
    La referencia está metida en MVCTest/Views/Shared/_Layout.cshtml

2. Para poder ver los cambios en tiempo real, es necesario que se regenere el bundle cuando haya cambios.

    Esto se consigue con el script onchange que escucha cambios en ficheros. Así, hay una tarea específica en el package-json que permite regenerar el bundle cada vez que cambie un fichero, de manera que la parte MVC tenga siempre el código actualizado.  


3. Para que funcionen las referencias desde los js o css de Front a iconos u otros archivos, se ha hecho otra configuración de webpack para ajustar la ruta. 


Como la plantilla de create-react-app no permite cambiar configuraciones de webpack por defecto, se ha utilizado el paquete react-app-rewired para poder realizar estas modificaciones. Todas ellas están en el fichero config-overrides.js

## Ejecución del proyecto

El proyecto MVC se levanta con el funcionamiento estándar en Visual Studio.

`Run Visual Studio (F5)`

A la vez se debe levantar el proyecto Front-End (MVCTest/ReactApp/sample-widget) con node. Una ejecución normal sería la estándar "npm start". Para que se levante con el listener de ficheros que regenera el bundle el comando es:

`npm run start-and-build`

## TODO Explicación de la reutilización de código entre proyectos (parte Dll)