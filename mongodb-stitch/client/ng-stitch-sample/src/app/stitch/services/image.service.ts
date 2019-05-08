import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ClientService } from './client.service';
import { Image } from './../types/image.d';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private isSubscribedToChangeEvents = false;

  public imageEvents: BehaviorSubject<Image> = new BehaviorSubject<Image>(undefined);

  constructor(private clientService: ClientService) {
  }

  findAll(): Promise<Array<Image>> {
    if (!this.clientService.getDatabase(environment.stitchImageDatabase)) {
      return;
    }

    return this.clientService.getDatabase(environment.stitchImageDatabase)
      .collection(environment.stitchImageCollection)
      .find({}, {limit: 10})
      .asArray();
  }

  subscribeToChangeEvents(ids: Array<string>): void {
    if (this.isSubscribedToChangeEvents) {
      return;
    }

    console.log('Creating stream on', environment.stitchImageDatabase, environment.stitchImageCollection, ids);
    this.clientService.getDatabase(environment.stitchImageDatabase)
      .collection(environment.stitchImageCollection)
      .watch(ids)
      .then((changeStream) => {
        changeStream.onNext((event) => {
          console.log('Event received', event);
          this.imageEvents.next(event.fullDocument);
        });
      });

    this.isSubscribedToChangeEvents = true;
  }
}
