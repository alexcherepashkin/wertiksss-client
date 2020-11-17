import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-page',
  template: `
    <h1 class="text-center">
      An unknown error occurred. Please try again later.
    </h1>
  `,
  styles: []
})
export class ErrorPageComponent {

  constructor() { }
}
