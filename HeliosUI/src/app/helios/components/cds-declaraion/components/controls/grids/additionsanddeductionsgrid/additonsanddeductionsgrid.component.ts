import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatDialog, MatTableDataSource, MatTable } from '@angular/material';
import { DeclarationService } from 'src/app/helios/service/declaration.service';
import { HttpClient } from '@angular/common/http';

export interface AddiionsAndDeductionsGrid {
  index: number;
  code: string;
  currency: string;
  amount: number;
}

const ELEMENT_DATA: AddiionsAndDeductionsGrid[] = [];

@Component({
  selector: 'app-additonsanddeductionsgrid',
  templateUrl: './additonsanddeductionsgrid.html',
  styleUrls: ['./additonsanddeductionsgrid.scss']
})

export class ModalgridComponent implements OnInit {
  expanded = false;
  tableHeaderRow = 'Additions and Deductions';
  columns = ['code', 'currency', 'add'];
  dataSource: MatTableDataSource<AddiionsAndDeductionsGrid>;
  codeLookupInput: string;
  dataSourceIndex: number;
  tableRowIndex: number;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public httpClient: HttpClient, public dialog: MatDialog, public dataService: DeclarationService) { }

  ngOnInit() {

    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSourceIndex = 0;
  }

  closeLookupHandler(element: any) {
    console.log('Close lookup event received');
    element.expanded = false;
  }

  updateAdditionalCodeHandler(event: any, element: any) {
    console.log('Update Addition Code event received: ' + event.code);
    element.expanded = false;
    this.updateSelectedDataRow(this.tableRowIndex, event.code);
  }

  private updateSelectedDataRow(tableRowIndex: number, code: any) {
    const matchedData = ELEMENT_DATA.find(x => x.index === tableRowIndex);
    console.log('Found matching array data at index: ' + tableRowIndex);

    console.log('About to update datasource with Additonal code value: ' + code);
    matchedData.code = code;
  }

  addRow() {
    this.doAddRow();
    this.expanded = false;
  }

  removeAt(index: number) {
    const data = this.dataSource.data;
    data.splice(index, 1);
    this.dataSource.data = data;
    this.expanded = false;
  }

  toggleLookup(event: any, element: any, index: number): void {
    if (event.target.value !== '?') {
      return;
    }
    this.tableRowIndex = index;
    event.target.value = '';
    element.expanded = true;
  }

  onDown() {
    this.addRow();
  }

  private doAddRow() {
    this.addNewDataSourceArrayObject();
    this.dataSourceIndex++;
  }

  private addNewDataSourceArrayObject() {
    ELEMENT_DATA.push({ index: this.dataSourceIndex, code: '', currency: '', amount: 0 });
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
  }
}
