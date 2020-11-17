import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/model/account';
import { AccountService } from 'src/app/service/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-account-editor',
  templateUrl: './account-editor.component.html',
  styleUrls: ['./account-editor.component.css']
})
export class AccountEditorComponent implements OnInit {
  account: Account;
  errorMessage: string;
  loading = false;

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
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

  onSubmit() {
    this.loading = true;
    this.account.secretAnswers = this.account.secretAnswers.filter(answer => answer != undefined);

    this.accountService.updateAccount(this.account).subscribe({
      next: (acc: Account) => {
        if (acc != null && typeof acc.id === 'number') {
          this.showMessage('Account successfully updated');
          this.redirectTo(acc.id);
        }
      },
      // error: (_err) => this.loading = false
    });
  }

  private redirectTo(id: number): void {
    this.router.navigate([`/main/accounts/${id}`], { replaceUrl: false });
  }

  private showMessage(message: string): void {
    this.notifier.showSuccess('Ok', message);
  }

  goBack(): void {
    this.location.back();
  }
}
