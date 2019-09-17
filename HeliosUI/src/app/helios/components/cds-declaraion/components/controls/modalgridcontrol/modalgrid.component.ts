import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, merge, BehaviorSubject, fromEvent } from 'rxjs';
import { MatSort, MatPaginator, MatDialog } from '@angular/material';
import { DeclarationService } from 'src/app/helios/service/declaration.service';
import { DataSource } from '@angular/cdk/table';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AddDialogComponent } from '../dialogs/add/add.component';
import { OtherAdditionsAndDeductions } from 'src/app/helios/model/otheradditionsAndDeductions';
import { EditDialogComponent } from '../dialogs/edit/edit-dialog.component';

@Component({
  selector: 'app-modalgrid',
  templateUrl: './modalgrid.component.html',
  styleUrls: ['./modalgrid.component.scss']
})
export class ModalgridComponent implements OnInit {
  displayedColumns = ['code', 'currency',  'amount'];
  declarationService: DeclarationService | null;
  dataSource: ExampleDataSource | null;
  index: number;
  code: string;

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public dataService: DeclarationService) { }

              @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
              @ViewChild(MatSort, { static: true }) sort: MatSort;
              @ViewChild('filter', { static: true }) filter: ElementRef;

  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  addNew(port: OtherAdditionsAndDeductions) {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: { OtherAdditionsAndDeductions: port }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.declarationService.dataChange.value.push(this.dataService.getDialogData());
        this.refreshTable();
      }
    });
  }

  private refreshTable() {
    // Refreshing table using paginator
    // Thanks yeager-j for tips
    // https://github.com/marinantonio/angular-mat-table-crud/issues/12
    this.paginator._changePageSize(this.paginator.pageSize);
  }


  public loadData() {
    this.declarationService = new DeclarationService(this.httpClient);
    this.dataSource = new ExampleDataSource(this.declarationService, this.paginator, this.sort);
    fromEvent(this.filter.nativeElement, 'keyup')
      // .debounceTime(150)
      // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

  startEdit(i: number, code: string, name: string, city: string, state: string, country: string, runwayLength: string, type: string) {
    this.code = code;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: { code, name, city, state, country, runwayLength, type }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.declarationService.dataChange.value.findIndex(x => x.code === this.code);
        // Then you update that record using data from dialogData (values you enetered)
        this.declarationService.dataChange.value[foundIndex] = this.dataService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
      }
    });
  }

}

export class ExampleDataSource extends DataSource<OtherAdditionsAndDeductions> {
  filterChange = new BehaviorSubject('');

  get filter(): string {
    return this.filterChange.value;
  }

  set filter(filter: string) {
    this.filterChange.next(filter);
  }

  filteredData: OtherAdditionsAndDeductions[] = [];
  renderedData: OtherAdditionsAndDeductions[] = [];

  constructor(public declarationService: DeclarationService,
              public paginator: MatPaginator,
              public sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => this.paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<OtherAdditionsAndDeductions[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.declarationService.dataChange,
      this.sort.sortChange,
      this.filterChange,
      this.paginator.page
    ];

    this.declarationService.getAllAdditionsAndDeductions();


    return merge(...displayDataChanges).pipe(map(() => {
      // Filter data
      this.filteredData = this.declarationService.portAllPorts.slice().filter((issue: OtherAdditionsAndDeductions) => {
        const searchStr = (issue.code + issue.code).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this.paginator.pageSize);
      return this.renderedData;
    }
    ));
  }

  disconnect() { }

  /** Returns a sorted copy of the database data. */
  sortData(data: OtherAdditionsAndDeductions[]): OtherAdditionsAndDeductions[] {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this.sort.active) {
        case 'code': [propertyA, propertyB] = [a.code, b.code]; break;
        case 'name': [propertyA, propertyB] = [a.currency, b.currency]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this.sort.direction === 'asc' ? 1 : -1);
    });
  }

}
