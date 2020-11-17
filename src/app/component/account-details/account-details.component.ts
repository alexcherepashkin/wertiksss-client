import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/model/account';
import { AccountService } from 'src/app/service/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ConfirmationDialogService } from 'src/app/service/confirmation-dialog.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  account: Account;
  errorMessage: string;

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private dialogBox: ConfirmationDialogService,
    private notifier: NotificationService
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getAccount(id);
  }

  getAccount(id: number): void {
    this.accountService.getAccountById(id).subscribe({
      next: (acc: Account) => this.account = acc
    });
  }

  deleteAccount(account: Account): void {
    this.accountService.deleteAccount(account).subscribe({
      next: (response: any) => {
        if (response?.message) {
          this.showMessage(response.message);
          this.redirectTo();
        }
      },
    });
  }

  confirmDeletion(account: Account): void {
    this.dialogBox.confirm(`Are you sure you want to delete the account: ${account.firstName} ${account.lastName}?`)
      .then((confirmed) => { if (confirmed) this.deleteAccount(account); })
      .catch(() => { });
  }

  private showMessage(message: string): void {
    this.notifier.showSuccess('Ok', message);
  }

  private redirectTo(): void {
    this.router.navigate(['/main/accounts'], { replaceUrl: true });
  }

  goBack(): void {
    this.location.back();
  }

}
