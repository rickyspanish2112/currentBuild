import { Component, OnInit } from '@angular/core';
import { Port } from 'src/app/helios/model/port';
import { Observable, merge, BehaviorSubject } from 'rxjs';
import { MatSort, MatPaginator } from '@angular/material';
import { DeclarationService } from 'src/app/helios/service/declaration.service';
import { DataSource } from '@angular/cdk/table';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-modalgrid',
  templateUrl: './modalgrid.component.html',
  styleUrls: ['./modalgrid.component.scss']
})
export class ModalgridComponent implements OnInit {
  displayedColumns = ['code', 'name',  'city', 'state', 'country',  'runwayLength', 'type', 'actions'];
  declarationService: DeclarationService | null;
  dataSource: ExampleDataSource | null;
  index: number;
  code: string;

  constructor() { }

  ngOnInit() {
  }

}

export class ExampleDataSource extends DataSource<Port> {
  filterChange = new BehaviorSubject('');

  get filter(): string {
    return this.filterChange.value;
  }

  set filter(filter: string) {
    this.filterChange.next(filter);
  }

  filteredData: Port[] = [];
  renderedData: Port[] = [];

  constructor(public declarationService: DeclarationService,
              public paginator: MatPaginator,
              public sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => this.paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Port[]> {
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
      this.filteredData = this.declarationService.portAllPorts.slice().filter((issue: Port) => {
        const searchStr = (issue.code + issue.name).toLowerCase();
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
  sortData(data: Port[]): Port[] {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this.sort.active) {
        case 'code': [propertyA, propertyB] = [a.code, b.code]; break;
        case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this.sort.direction === 'asc' ? 1 : -1);
    });
  }

}
