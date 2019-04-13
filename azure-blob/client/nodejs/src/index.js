const {
  Aborter,
  BlockBlobURL,
  ContainerURL,
  ServiceURL,
  SharedKeyCredential,
  StorageURL,
  uploadStreamToBlockBlob,
  uploadFileToBlockBlob
} = require('@azure/storage-blob');

const fs = require("fs");
const path = require("path");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const STORAGE_ACCOUNT_NAME = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const ACCOUNT_ACCESS_KEY = process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY;

const ONE_MEGABYTE = 1024 * 1024;
const FOUR_MEGABYTES = 4 * ONE_MEGABYTE;
const ONE_MINUTE = 60 * 1000;

async function showContainerNames(aborter, serviceURL) {
  let response;
  let marker;

  do {
    response = await serviceURL.listContainersSegment(aborter, marker);
    marker = response.marker;
    for (let container of response.containerItems) {
      console.log(` - ${container.name}`);
    }
  } while (marker);
}

async function uploadLocalFile(aborter, containerURL, filePath) {
  filePath = path.resolve(filePath);

  const fileName = path.basename(filePath);
  const blockBlobURL = BlockBlobURL.fromContainerURL(containerURL, fileName);

  return await uploadFileToBlockBlob(aborter, filePath, blockBlobURL);
}

async function uploadStream(aborter, containerURL, filePath) {
  filePath = path.resolve(filePath);

  const fileName = path.basename(filePath).replace('.md', '-stream.md');
  const blockBlobURL = BlockBlobURL.fromContainerURL(containerURL, fileName);

  const stream = fs.createReadStream(filePath, {
    highWaterMark: FOUR_MEGABYTES,
  });

  const uploadOptions = {
    bufferSize: FOUR_MEGABYTES,
    maxBuffers: 5,
  };

  return await uploadStreamToBlockBlob(aborter, stream, blockBlobURL,
    uploadOptions.bufferSize, uploadOptions.maxBuffers);
}

async function showBlobNames(aborter, containerURL) {
  let response;
  let marker;

  do {
    response = await containerURL.listBlobFlatSegment(aborter);
    marker = response.marker;
    for (let blob of response.segment.blobItems) {
      console.log(` - ${blob.name}`);
    }
  } while (marker);
}

// reads a Node.js readable stream into string
async function streamToString(readableStream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on("data", data => {
      chunks.push(data.toString());
    });
    readableStream.on("end", () => {
      resolve(chunks.join(""));
    });
    readableStream.on("error", reject);
  });
}

async function execute() {
  const containerName = "demo";
  const blobName = "quickstart.txt";
  const content = "hello!";
  const localFilePath = "./readme.md";

  const credentials = new SharedKeyCredential(STORAGE_ACCOUNT_NAME, ACCOUNT_ACCESS_KEY);
  const pipeline = StorageURL.newPipeline(credentials);
  const serviceURL = new ServiceURL(`https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net`, pipeline);

  const containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);
  const blockBlobURL = BlockBlobURL.fromContainerURL(containerURL, blobName);

  const aborter = Aborter.timeout(30 * ONE_MINUTE);

  console.log("Containers:");
  await showContainerNames(aborter, serviceURL);

  // await containerURL.delete(aborter);
  // console.log(`Container: "${containerName}" has been deleted`);
  // wait 30 seonds at least
  // https://docs.microsoft.com/en-us/rest/api/storageservices/delete-container

  await containerURL.create(aborter);
  console.log(`Container: "${containerName}" is created`);

  await blockBlobURL.upload(aborter, content, content.length);
  console.log(`Blob "${blobName}" is uploaded`);

  await uploadLocalFile(aborter, containerURL, localFilePath);
  console.log(`Local file "${localFilePath}" is uploaded`);

  await uploadStream(aborter, containerURL, localFilePath);
  console.log(`Local file "${localFilePath}" is uploaded as a stream`);

  console.log(`Blobs in "${containerName}" container:`);
  await showBlobNames(aborter, containerURL);

  //const downloadResponse = await blockBlobURL.download(aborter, 0);
  //const downloadedContent = downloadResponse.readableStreamBody.read(content.length).toString();
  //console.log(`Downloaded blob content: "${downloadedContent}"`);

  // get blob content from position 0 to the end
  const downloadBlockBlobResponse = await blockBlobURL.download(aborter, 0);
  console.log(
    "Downloaded blob content",
    await streamToString(downloadBlockBlobResponse.readableStreamBody)
  );

  await blockBlobURL.delete(aborter)
  console.log(`Block blob "${blobName}" is deleted`);

  await containerURL.delete(aborter);
  console.log(`Container "${containerName}" is deleted`);
}

execute()
  .then(() => console.log("Done"))
  .catch((e) => console.log(e));
