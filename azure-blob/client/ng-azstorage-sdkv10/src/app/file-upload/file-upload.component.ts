import { Component, OnInit } from '@angular/core';
import { StorageURL, ServiceURL, Aborter, AnonymousCredential, ContainerURL, BlobURL, BlockBlobURL } from '@azure/storage-blob';
import { ContainerItem } from '@azure/storage-blob/typings/lib/generated/lib/models';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  private serviceURL: ServiceURL;
  containers: Array<ContainerItem>;

  async ngOnInit() {
    this.containers = new Array<ContainerItem>();

    // remark: SharedKeyCredential (from '@azure/storage-blob') is not available for a browser JS application
    const anonymousCredential = new AnonymousCredential();
    const pipeline = StorageURL.newPipeline(anonymousCredential);

    // List containers
    this.serviceURL = new ServiceURL(
      // remark: when using AnonymousCredential, following url must  include a valid SAS or support public access
      `https://${environment.azureStorageAccountName}.blob.core.windows.net?${environment.azureStorageAccountSas}`,
      pipeline
    );

    await this.listContainers();

    this.createContainer()
      .then(containerURL => {
        this.createBlob(containerURL)
          .then(blobURL => {
            this.getBlobContent(blobURL);
            this.listBlobs(containerURL);
            this.deleteContainer(containerURL);
          });
      });
  }

  async listContainers() {
    let marker: string;
    do {
      const listContainersResponse = await this.serviceURL.listContainersSegment(
        Aborter.none,
        marker
      );

      marker = listContainersResponse.nextMarker;
      for (const container of listContainersResponse.containerItems) {
        console.log(`Container: ${container.name}`);
        console.log(container);
      }
      this.containers = this.containers.concat(listContainersResponse.containerItems);
    } while (marker);
  }

  async createContainer(): Promise<ContainerURL> {
    const containerName = `newcontainer${new Date().getTime()}`;
    const containerURL = ContainerURL.fromServiceURL(this.serviceURL, containerName);
    const createContainerResponse = await containerURL.create(Aborter.none);
    console.log(
      `Create container ${containerName} successfully`,
      createContainerResponse.requestId
    );
    return containerURL;
  }

  async createBlob(containerURL: ContainerURL): Promise<BlobURL> {
    const content = 'hello';
    const blobName = 'newblob' + new Date().getTime();
    const blobURL = BlobURL.fromContainerURL(containerURL, blobName);
    const blockBlobURL = BlockBlobURL.fromBlobURL(blobURL);
    const uploadBlobResponse = await blockBlobURL.upload(
      Aborter.none,
      content,
      content.length
    );
    console.log(
      `Upload block blob ${blobName} successfully`,
      uploadBlobResponse.requestId
    );
    return blobURL;
  }

  async listBlobs(containerURL: ContainerURL) {
    let marker: string;
    do {
      const listBlobsResponse = await containerURL.listBlobFlatSegment(
        Aborter.none,
        marker
      );
      marker = listBlobsResponse.nextMarker;
      for (const blob of listBlobsResponse.segment.blobItems) {
        console.log(`Blob: ${blob.name}`);
      }
    } while (marker);
  }

  async getBlobContent(blobURL: BlobURL) {
    // In Node.js, get downloaded data by accessing downloadBlockBlobResponse.readableStreamBody
    // In browsers, get downloaded data by accessing downloadBlockBlobResponse.blobBody
    const downloadBlockBlobResponse = await blobURL.download(Aborter.none, 0);
    const blob = await downloadBlockBlobResponse.blobBody;
    const text = await this.blobToString(blob);
    console.log('Downloaded blob content', text);
  }

  async deleteContainer(containerURL: ContainerURL) {
    await containerURL.delete(Aborter.none);
    console.log(
      `Delete container successfully`,
      containerURL.url
    );
  }

  private async blobToString(blob: Blob) {
    const fileReader = new FileReader();
    return new Promise((resolve, reject) => {
      fileReader.onloadend = ev => {
        resolve((ev.target as FileReader).result);
      };
      fileReader.onerror = reject;
      fileReader.readAsText(blob);
    });
  }
}
