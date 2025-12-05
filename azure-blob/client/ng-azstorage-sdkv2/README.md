# Angular client for Azure Storage using SDK v2

This is a simple SPA based on Angular to experiment [Microsoft Azure Storage SDK for Node.js and JavaScript for Browsers](https://github.com/Azure/azure-storage-node).

**azure-storage**: [API](https://docs.microsoft.com/en-us/javascript/api/%40azure/storage-blob/index?view=azure-node-preview) [NPM reference](https://www.npmjs.com/package/azure-storage)

[Quickstart: Upload, list, and delete blobs using JavaScript/HTML in the Browser](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-javascript-client-libraries)

[BlobService](https://azure.github.io/azure-storage-node/BlobService.html)

[Upload to Azure Blob Storage with Angular](https://medium.com/@stuarttottle/upload-to-azure-blob-storage-with-angular-7977e979496a) [stottle-uk/stottle-angular-blob-storage-upload](https://github.com/stottle-uk/stottle-angular-blob-storage-upload/tree/master/src) [stackoverflow](https://stackoverflow.com/questions/51200533/upload-to-azure-storage-from-directly-from-angular-app)

## History

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.8:

```bash
ng new
cd ng-azstorage-sdkv2
```

Azure Storage SDK has been installed with the command:

```bash
npm install azure-storage
```

Configure CORS in Azure Portal on Azure Storage.

Create manually a SAS in Azure Cloud Shell (from Azure Portal):

```bash
az storage account generate-sas --permissions racwdl --resource-types sco --services b --expiry YYYY-MM-DD --account-name YOUR_STORAGE_ACCOUNT_NAME --account-key YOUR_STORAGE_ACCOUNT_KEY
```

Fix: workaround for issue with WebPack [Angular 6 – Cannot resolve crypto, fs, net, path, stream when building Angular](https://blog.lysender.com/2018/07/angular-6-cannot-resolve-crypto-fs-net-path-stream-when-building-angular/)

Fix: edit tsconfig.app.json to have node in types `"types": ["node"]`

### Code scaffolding

Angular components were generated from Angular CLI:

```bash
ng generate component containers
```

You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build & Run

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
