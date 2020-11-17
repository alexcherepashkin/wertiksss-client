import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/model/account';
import { AccountService } from 'src/app/service/account.service';
import { Location } from '@angular/common';
import { ConfirmationDialogService } from 'src/app/service/confirmation-dialog.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  accounts: Account[];
  errorMessage: string;

  constructor(private accountService: AccountService,
    private location: Location,
    private dialogBox: ConfirmationDialogService,
    private notifier: NotificationService
  ) { }

  ngOnInit(): void {
    this.getAllAccounts();
  }

  getAllAccounts(): void {
    this.accountService.getAllAccounts().subscribe({
      next: (list: Account[]) => this.accounts = this.sortByIdDesc(list)
    });
  }

  deleteAccount(account: Account): void {
    this.confirmDeletion(account).then((confirmed) => {
      if (confirmed) {
        this.accountService.deleteAccount(account.id).subscribe({
          next: (response: any) => {
            if (response?.message) {
              this.showMessage(response.message);
              this.filterDeleted(account);
            }
          }
        });
      }
    })
      .catch(() => { });
  }

  private confirmDeletion(account: Account): Promise<boolean> {
    return this.dialogBox.confirm(`Are you sure you want to delete the account: ${account.firstName} ${account.lastName}?`)
  }

  private showMessage(message: string): void {
    this.notifier.showSuccess('Ok', message);
  }

  private sortByIdDesc(accounts: Account[]): Account[] {
    return accounts.length > 1 ? accounts.sort((a, b) => -(a.id - b.id)) : accounts;
  }

  private filterDeleted(account: Account): void {
    this.accounts = this.accounts.filter(acc => acc !== account);
  }

  goBack(): void {
    this.location.back();
  }

}
