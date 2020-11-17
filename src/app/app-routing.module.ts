import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountBoardComponent } from './component/account-board/account-board.component';
import { AccountListComponent } from './component/account-list/account-list.component';
import { AccountFormComponent } from './component/account-form/account-form.component';
import { AccountFoundListComponent } from './component/account-found-list/account-found-list.component';
import { AccountDetailsComponent } from './component/account-details/account-details.component';
import { AccountEditorComponent } from './component/account-editor/account-editor.component';
import { HomeComponent } from './component/home/home.component';
import { AdminBoardComponent } from './component/admin-board/admin-board.component';
import { ProfileComponent } from './component/user-profile/profile.component';
import { LoginComponent } from './component/user-login/login.component';
import { RegisterComponent } from './component/user-register/register.component';
import { AuthGuard } from './helper/auth.guard';
import { ErrorPageComponent } from './component/error-page/error-page.component';

const accountsChildRoutes: Routes = [
  { path: 'accounts', component: AccountListComponent },
  { path: 'accounts/form', component: AccountFormComponent },
  { path: 'accounts/search', component: AccountFoundListComponent },
  { path: 'accounts/:id', component: AccountDetailsComponent },
  { path: 'accounts/:id/edit', component: AccountEditorComponent }
];

const adminChildRoutes: Routes = [
  { path: 'admin/usrs', component: AdminBoardComponent }
];

const routes: Routes = [
  { path: 'main', component: AccountBoardComponent, children: accountsChildRoutes, canActivate: [AuthGuard], canActivateChild: [AuthGuard] },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminBoardComponent, children: adminChildRoutes, canActivate: [AuthGuard], canActivateChild: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'error', component: ErrorPageComponent },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
