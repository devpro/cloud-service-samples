import { Injectable } from '@angular/core';
import { ClientService } from './client.service';
import { Image } from './../types/image.d';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private clientService: ClientService) {
  }

  findAll(): Promise<Array<Image>> {
    if (!this.clientService.getDatabase('demoStorage')) {
      return;
    }

    return this.clientService.getDatabase('demoStorage').collection('images').find({}, {limit: 10})
      .asArray();
  }
}
