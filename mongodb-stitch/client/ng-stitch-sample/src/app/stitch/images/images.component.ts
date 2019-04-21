import { Component, OnInit, OnDestroy } from '@angular/core';
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
  displayedColumns: string[] = [ 'url', 'caption', 'tags' ];
  images: Array<Image> = [];
  userEventsSubscription: Subscription;

  constructor(private imageService: ImageService, private userService: UserService) {
  }

  async ngOnInit(): Promise<void> {
    this.userEventsSubscription = this.userService.userEvents.subscribe(user => {
      if (!user) {
        this.images = [];
        return;
      }

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
