import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/model/account';
import { AccountService } from 'src/app/service/account.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css']
})
export class AccountFormComponent implements OnInit {
  account: Account;
  errorMessage: string;
  loading = false;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private location: Location,
    private notifier: NotificationService
  ) { this.account = new Account(); }

  ngOnInit(): void { }

  onSubmit() {
    this.loading = true;
    this.account.secretAnswers = this.account.secretAnswers.filter(answer => answer != undefined);

    this.accountService.saveAccount(this.account).subscribe({
      next: (acc: Account) => {
        if (acc != null && typeof acc.id === 'number') {
          this.showMessage('Account successfully created');
          this.redirectTo(acc.id);
        }
      },
      // error: (_err: any) => this.loading = false
    });
  }

  private redirectTo(id: number): void {
    this.router.navigate([`/main/accounts/${id}`]);
  }

  private showMessage(message: string): void {
    this.notifier.showSuccess('Ok', message);
  }

  goBack(): void {
    this.location.back();
  }
}
