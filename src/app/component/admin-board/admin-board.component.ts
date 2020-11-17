import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/model/user';
import { ConfirmationDialogService } from 'src/app/service/confirmation-dialog.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.css']
})
export class AdminBoardComponent implements OnInit {
  // TODO: check if the currentUser isAdmin

  users: User[];

  constructor(private userService: UserService,
    private dialogBox: ConfirmationDialogService,
    private notifier: NotificationService
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  private getAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (usrs) => this.users = this.sortByName(usrs)
    });
  }

  removeUser(user: User): void {
    this.dialogBox.confirm(`Are you sure you want to remove the user: ${user.id}-${user.username}?`)
      .then((confirmed) => {
        if (confirmed) this.doRemove(user);
      })
      .catch(() => { });
  }

  private doRemove(user: User) {
    this.userService.removeUser(user.id).subscribe({
      next: (response: any) => {
        if (response?.message) {
          this.showMessage(response.message);
          this.filterDeleted(user);
        }
      }
    });
  }

  private showMessage(message: string) {
    this.notifier.showSuccess('Ok', message);
  }

  private filterDeleted(user: User) {
    this.users = this.users.filter(usr => usr !== user);
  }

  private sortByName(users: User[]): User[] {
    return users.length > 1 ? users.sort((a, b) => (a.username.toLowerCase() > b.username.toLowerCase()) ? 1 : -1) : users;
  }

}
