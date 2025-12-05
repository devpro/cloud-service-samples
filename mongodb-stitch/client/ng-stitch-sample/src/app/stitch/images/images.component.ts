import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/user/services/user.service';
import { ImageService } from '../services/image.service';
import { Image } from '../types/image';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [ 'url', 'caption', 'tags', 'freetext' ];
  images: Array<Image> = [];
  userEventsSubscription: Subscription;
  imageEventsSubscription: Subscription;

  constructor(private imageService: ImageService, private userService: UserService,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.userEventsSubscription = this.userService.userEvents.subscribe(user => {
      if (!user) {
        this.images = [];
        return;
      }

      this.loadData();
    });

    this.imageEventsSubscription = this.imageService.imageEvents.subscribe(image => {
      this.loadData();
    });
  }

  ngOnDestroy() {
    if (this.userEventsSubscription) {
      this.userEventsSubscription.unsubscribe();
    }
    if (this.imageEventsSubscription) {
      this.imageEventsSubscription.unsubscribe();
    }
  }

  private loadData() {
    this.imageService.findAll().then(
      images => {
        this.images = images;
        this.imageService.subscribeToChangeEvents(images.map(x => x._id));
        this.changeDetectorRef.detectChanges();
      }, error => console.warn(error)
    );
  }
}
