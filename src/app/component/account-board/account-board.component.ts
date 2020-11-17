import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

export const SEARCH_OPTIONS = ['number', 'last-name', 'model'];

@Component({
  selector: 'app-account-board',
  templateUrl: './account-board.component.html',
  styleUrls: ['./account-board.component.css']
})
export class AccountBoardComponent implements OnInit {
  searchOptions: string[];

  constructor(private router: Router, private route: ActivatedRoute) {
    this.searchOptions = SEARCH_OPTIONS;
  }

  ngOnInit(): void { }

  searchBy(searchTerm: string, searchOption: string): void {
    if (searchTerm.trim() && searchOption?.length > 0) {
      this.router.navigate(['./accounts/search'], { relativeTo: this.route, queryParams: { 'term': searchTerm, 'option': searchOption } });
    }
  }

}
