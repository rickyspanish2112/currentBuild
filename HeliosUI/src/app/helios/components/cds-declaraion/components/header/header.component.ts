import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  declarationHeaderExpanded: boolean;
  customCollapsedHeight = '40px';
  customExpandedHeight = '40px';
  pageTitle = 'Declaration Header';

  constructor() {}

  ngOnInit() {}
}
