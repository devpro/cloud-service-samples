# NgStitchSample

[JavaScript SDK](https://docs.mongodb.com/stitch/procedures/init-stitchclient/) [MongoDB Stitch Browser SDK](https://docs.mongodb.com/stitch-sdks/js/4/index.html)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Angular Material

[Angular Material](https://material.angular.io/) [angular/flex-layout](https://github.com/angular/flex-layout)

```bash
ng generate @angular/material:materialNav
```

[Getting Started With Angular Material 2](https://alligator.io/angular/angular-material-2/)

### Stitch SDK

```bash
npm install mongodb-stitch-browser-sdk
```

Fix: Edit the file [polyfill.ts](src/polyfill.ts) to add the following line (found on [stackoverflow](https://stackoverflow.com/questions/55667430/mongodb-stitch-in-angular-7-application))

```ts
(window as any).global = window;
```

### Google Authentication

[Google Authentication](https://docs.mongodb.com/stitch/authentication/google/) [MongoDB Guides > Sample App: React + Stitch + Google Authentication](https://docs.mongodb.com/guides/stitch/react_googleauth/)

[Getting up OAuth 2.0](https://support.google.com/cloud/answer/6158849?hl=en) will redirect you to [Google Cloud Platform](https://console.cloud.google.com/getting-started)

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
