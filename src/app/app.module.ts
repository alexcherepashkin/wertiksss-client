import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModalModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AccountBoardComponent } from './component/account-board/account-board.component';
import { AccountListComponent } from './component/account-list/account-list.component';
import { AccountFormComponent } from './component/account-form/account-form.component';
import { AccountDetailsComponent } from './component/account-details/account-details.component';
import { AccountEditorComponent } from './component/account-editor/account-editor.component';
import { AccountFoundListComponent } from './component/account-found-list/account-found-list.component';
import { AccountService } from './service/account.service';
import { ConfirmationDialogComponent } from './component/confirmation-dialog/confirmation-dialog.component';
import { HomeComponent } from './component/home/home.component';
import { AdminBoardComponent } from './component/admin-board/admin-board.component';
import { ProfileComponent } from './component/user-profile/profile.component';
import { AuthService } from "./service/auth.service";
import { LoginComponent } from './component/user-login/login.component';
import { RegisterComponent } from './component/user-register/register.component';
import { UserService } from "./service/user.service";
import { AuthGuard } from './helper/auth.guard';
import { AuthInterceptor } from './helper/auth.interceptor';
import { HttpErrorInterceptor } from './helper/http-error.interceptor';
import { GlobalErrorHandler } from './helper/global-error-handler';
import { ErrorPageComponent } from './component/error-page/error-page.component';
import { NotificationComponent } from './component/notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountBoardComponent,
    AccountListComponent,
    AccountFormComponent,
    AccountDetailsComponent,
    AccountEditorComponent,
    AccountFoundListComponent,
    ConfirmationDialogComponent,
    HomeComponent,
    AdminBoardComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    ErrorPageComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    // BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModalModule,
    NgbToastModule
  ],
  providers: [
    AccountService,
    AuthService,
    UserService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
