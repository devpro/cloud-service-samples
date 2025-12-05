import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ClientService as StitchClientService } from 'src/app/stitch/services/client.service';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  stitchUserEventsSubscription: Subscription;

  public userEvents: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(undefined);

  constructor(private stitchClientService: StitchClientService) {
    this.stitchUserEventsSubscription = this.stitchClientService.userEvents.subscribe(stitchUser => {
      this.retrieveUser();
    });
  }

  ensureIsAuthenticated(): void {
    if (this.stitchClientService.isAuthenticated()) {
      return;
    }

    this.stitchClientService.login();
  }

  logout(): void {
    this.stitchClientService.logout();
    this.userEvents.next(null);
  }

  retrieveUser(): void {
    if (!this.stitchClientService.isAuthenticated()) {
      return;
    }

    const userModel = new UserModel();
    userModel.username = this.stitchClientService.getUser().profile.name;
    this.userEvents.next(userModel);
  }

  dispose(): void {
    if (this.stitchUserEventsSubscription) {
      this.stitchUserEventsSubscription.unsubscribe();
    }
  }
}
