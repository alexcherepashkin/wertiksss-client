import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { JwtStorageService } from 'src/app/service/jwt-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: User;
  expiration: Date;

  constructor(private authService: AuthService, private storageService: JwtStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.authService.jwtUserValue;
    this.expiration = this.storageService.tokenExpiresOn();
  }

}
