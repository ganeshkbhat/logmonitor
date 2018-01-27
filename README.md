# Log Viewer and Monitor

Log viewer was created with a goal to work with logs.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.0. This repo needs [NodeJS](https://www.nodejs.org) to be installed along with [Angular CLI](https://github.com/angular/angular-cli) and [Typescript](https://www.typescriptlang.org/).

## Server setup

Add your own ia.crt and ia.key for the application. A dummy certificate is added for a quick demo.
Run `npm install` to set up node_modules folder

## Build

Run `ng build --target=production --environment=prod --output-path='./server/views/' --sourcemaps=false --base-href='/' --vendor-chunk=true --extract-css=true --delete-output-path=true --aot --build-optimizer=true` to build the project. The build artifacts will be stored in the `server/views/` directory. Use the `-prod` flag for a production build.

### Main Application Folder

The main application resides in the `./server` folder. The UI has been prebuilt for a demo; in case you want to check the features. The repo also has dummy certificate files. However, if you want to be sure of safety, you can recreate your own certificates using openssl or use any valid certificate authority's certificate. The git hub repository is ahead of the UI application developed. However, the repo nor the prebuilt UI in the `./server/views/` folder `should not` break, in any scenario, while running the prebuilt demo UI.

## Running actual pre-built Application

Run `npm install` to set up node_modules folder (NodeJS installation needed)

Run `node server/index.js` or `npm run server` to run server and open `https://localhost:9010` to run the pre-built application (may not be in sync with the repo but will contain last updated stable release)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Running unit tests (TODO - Tests not added)

Tests have not been added since currently it is a simple application. TODO: Consider TDD for new features further.

## Running end-to-end tests (TODO - Tests not added)

Tests have not been added since currently it is a simple application. TODO: Consider TDD for new features further.

## Angular CLI Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Version

Current version 1.1.0

* Change log - 1.1.0

Changed architecture from events based routing to Angular Router based routing
-- Speed reduction, but scalable and performant

## Todo:

Monitor features extension and static log viewer

FTP, Remote files (SSH/Windows Network access)

Integration with your NodeJS Server cleanly with user security (npm package)

Move to xtermjs ES6 Codes

## License: 
                    
MIT License. Currently in Beta (V1.1.0). Developed by [Ganesh B](https://github.com/ganeshkbhat). Interested in contribution or Want to request a feature Leave a [Github Issue](https://github.com/ganeshkbhat/logmonitor/issues) or send a pull request.
