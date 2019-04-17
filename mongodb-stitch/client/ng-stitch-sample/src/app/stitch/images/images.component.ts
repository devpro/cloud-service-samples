import { Component, OnInit, OnDestroy } from '@angular/core';
import { ImageService } from '../services/image.service';
import { Image } from '../types/image';
import { UserService } from 'src/app/user/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [ 'url', 'caption' ];
  images: Array<Image> = [];
  userEventsSubscription: Subscription;

  constructor(private imageService: ImageService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.userEventsSubscription = this.userService.userEvents.subscribe(user => {
      this.imageService.findAll().then(
        images => this.images = images,
        error => console.warn(error)
      );
    });
  }

  ngOnDestroy() {
    if (this.userEventsSubscription) {
      this.userEventsSubscription.unsubscribe();
    }
    this.userService.dispose();
  }
}
