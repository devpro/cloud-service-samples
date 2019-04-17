import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/user/services/user.service';
import { UserModel } from 'src/app/user/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: UserModel;
  userEventsSubscription: Subscription;

  constructor(private userService: UserService) {
    this.userService.ensureIsAuthenticated();
  }

  ngOnInit() {
    this.userEventsSubscription = this.userService.userEvents.subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    if (this.userEventsSubscription) {
      this.userEventsSubscription.unsubscribe();
    }
    this.userService.dispose();
  }

  logout(event: Event) {
    event.preventDefault();
    this.userService.logout();
  }

  login(event: Event) {
    event.preventDefault();
    this.userService.ensureIsAuthenticated();
  }
}
