import { Component, OnInit } from '@angular/core';
import * as AzureStorage from 'azure-storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.css']
})
export class ContainersComponent implements OnInit {
  private blobService: AzureStorage.BlobService;
  containers: AzureStorage.BlobService.ContainerResult[];

  constructor() { }

  async ngOnInit() {
    const blobUri = `https://${environment.azureStorageAccountName}.blob.core.windows.net`;
    this.blobService = AzureStorage.createBlobServiceWithSas(blobUri, environment.azureStorageAccountSas);

    this.listContainers()
      .then(() => this.listContainerContent('images'));
  }

  private async listContainers(): Promise<void> {
    await this.blobService.listContainersSegmented(null, (error, data) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
        this.containers = data.entries;
      }
    });
  }

  private async listContainerContent(name: string): Promise<void> {
    await this.blobService.listBlobsSegmented(name, null, (error, results) => {
      if (error) {
        console.log(error);
      } else {
        results.entries.forEach(blob => {
          console.log(blob);
        });
      }
    });
  }
}
