# JsonLogViewerDevPm5

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.0.

## Server setup

Add your own ia.crt and ia.key for the application. A dummy certificate is added for a quick demo.
Run `npm install` to set up node_modules folder

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build -prod --environment=prod -aot -bh /` to build the project. The build artifacts will be stored in the `server/views/` directory. Use the `-prod` flag for a production build.

## Running unit tests (TODO - Tests not added)

Tests have not been added since currently it is a simple application. TODO: Consider TDD for new features further.

## Running end-to-end tests (TODO - Tests not added)

Tests have not been added since currently it is a simple application. TODO: Consider TDD for new features further.

## Running actual pre-built Application

Run `node server/index.js` or `npm run server` to run server and open https://localhost:9010 to run the pre-built application (may not be in sync with the repo but will contain last updated stable release)

### Main Application Folder

The main application resides in the `./server` folder. The git hub repository is ahead of the UI application developed. However, the repo `should not` break with the working UI in the `./server/views/`; in any scenario. 

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
