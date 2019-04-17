import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Stitch,
  StitchAppClient,
  GoogleRedirectCredential,
  StitchUser,
  RemoteMongoClient,
  RemoteMongoDatabase} from 'mongodb-stitch-browser-sdk';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  client: StitchAppClient;
  mongoClient: RemoteMongoClient;

  public userEvents: BehaviorSubject<StitchUser> = new BehaviorSubject<StitchUser>(undefined);

  constructor() {
    if (!Stitch.hasAppClient(environment.stitchAppId)) {
      this.client = Stitch.initializeDefaultAppClient(environment.stitchAppId);
    } else {
      this.client = Stitch.defaultAppClient;
    }

    this.mongoClient = this.client.getServiceClient(RemoteMongoClient.factory, environment.stitchMongoServiceName);

    if (this.client.auth.hasRedirectResult()) {
      this.client.auth.handleRedirectResult()
        .then(user => {
          this.userEvents.next(user);
        })
        .catch(console.error);
    }
  }

  getClient(): StitchAppClient {
    return this.client;
  }

  getDatabase(dbName: string): RemoteMongoDatabase {
    return this.mongoClient.db(dbName);
  }

  getUser(): StitchUser {
    return this.client.auth.user;
  }

  isAuthenticated(): boolean {
    return this.client.auth && this.client.auth.isLoggedIn;
  }

  login(): void {
    if (this.isAuthenticated()) {
      return;
    }

    const credential = new GoogleRedirectCredential();
    this.client.auth.loginWithRedirect(credential);
  }

  logout(): void {
    if (!this.isAuthenticated()) {
      return;
    }

    this.client.auth.logout()
      .then(resp => {
        this.userEvents.next(null);
      });
  }
}
