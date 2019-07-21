import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Output()
  toggleSidenav = new EventEmitter<void>();

  constructor(
    private matDialog: MatDialog,
    private snackBar: MatSnackBar) {}

  ngOnInit() {
  }

}
