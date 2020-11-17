import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from './model/user';
import { AuthService } from './service/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title: string;
  currentUser: User;
  isAdmin = false;
  isUser = false;
  subUser: Subscription;

  constructor(private authService: AuthService) {
    this.title = 'Wertiksss';
    this.subUser = this.authService.jwtUser.subscribe({ next: (jwtUser) => this.currentUser = jwtUser });
  }

  ngOnInit(): void {
    if (this.currentUser) {
      const roles = this.currentUser.roles;
      this.isAdmin = roles?.includes('ADMIN');
      this.isUser = roles?.includes('USER');
    }
  }

  logout() {
    this.authService.logout();
    window.location.reload();
  }

  ngOnDestroy() {
    this.subUser.unsubscribe();
  }

  // private showHidePlayer() {
  //   if (document.getElementById('player')) {
  //     var player = document.getElementById('player');
  //     player.hidden = !player.hidden;
  //   }
  // }
}
// ×