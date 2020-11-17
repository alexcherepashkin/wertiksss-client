import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Account } from 'src/app/model/account';
import { AccountService } from 'src/app/service/account.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ConfirmationDialogService } from 'src/app/service/confirmation-dialog.service';
import { NotificationService } from 'src/app/service/notification.service';


@Component({
  selector: 'app-account-found-list',
  templateUrl: './account-found-list.component.html',
  styleUrls: ['./account-found-list.component.css']
})
export class AccountFoundListComponent implements OnInit {
  accounts$: Observable<Account[]>;
  searchTerm: string;
  searchOption: string;
  errorMessage: string;

  constructor(private accountService: AccountService,
    private route: ActivatedRoute,
    private location: Location,
    private dialogBox: ConfirmationDialogService,
    private notifier: NotificationService
  ) { }

  ngOnInit(): void {
    this.searchAccounts();
  }

  searchAccounts(): void {
    this.accounts$ = this.route.queryParamMap.pipe(
      switchMap(params => {
        this.searchTerm = params.get('term');
        this.searchOption = params.get('option');

        return this.accountService.searchAccountsByTerms(this.searchTerm, this.searchOption);
      })
    );
  }

  deleteAccount(account: Account): void {
    this.confirmDeletion(account).then((confirmed) => {
      if (confirmed) {
        this.accountService.deleteAccount(account).subscribe({
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

  // TODO: incorrect impl
  private filterDeleted(account: Account) {
    this.accounts$ = this.accounts$.pipe(
      map((accounts) => {
        return accounts.filter(acc => acc !== account);
      })
    );
  }

  goBack(): void {
    this.location.back();
  }

}

// ngOnInit(): void {
//   this.accounts$ = this.searchTerms.pipe(
//     // ignore new term if same as previous term
//     distinctUntilChanged(),
//     // wait 300ms after each keystroke before considering the term
//     debounceTime(300),
//     // switch to new search observable each time the term changes
//     switchMap((term: string) => this.accountService.searchAccountsByTerm(term))
//   );
// }

// // Push a search term into the observable stream.
// addSearchTerm(term: string): void {
//   this.searchTerms.next(term);
// }

// ngOnInit() {
//   this.form.valueChanges
//     .takeUntil(this.ngUnsubscribe)      // отписаться после разрушения
//     .map(form => form['search-input'])  // данные инпута
//     .distinctUntilChanged()             // брать измененные данные
//     .debounceTime(300)                  // реагировать не сразу
//     .switchMap(this.wikipediaSearch)    // переключить Observable на запрос в Вики
//     .subscribe(data => console.log(data));
// }

// wikipediaSearch = (text: string) => {
//   return Observable
//     .ajax('https://api.github.com/search/repositories?q=' + text)
//     .map(e => e.response);
// }