# Node.js client example for Azure Blog storage

## Introduction

Code example taken from [Quickstart: Use .NET to create a blob in object storage](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-dotnet?tabs=windows) -> [Azure-Samples/azure-storage-js-v10-quickstart](https://github.com/Azure-Samples/azure-storage-js-v10-quickstart) and fixed with [Azure/azure-storage-js](https://github.com/Azure/azure-storage-js/blob/master/README.md).

## Getting started

- Check the pre-requisites: git, [Node.js](https://nodejs.org)

- Install the required packages

```bash
npm install
```

- Create an .env file (from a copy of .env.dist file) and edit the files with your secrets

- Run the script

```bash
node src/index.js
```

Expected output:

```plain
Containers:
 - images
Container: "demo" is created
Blob "quickstart.txt" is uploaded
Local file "./readme.md" is uploaded
Local file "./readme.md" is uploaded as a stream
Blobs in "demo" container:
 - quickstart.txt
 - readme-stream.md
 - readme.md
Downloaded blob content hello!
Block blob "quickstart.txt" is deleted
Container "demo" is deleted
Done
```
