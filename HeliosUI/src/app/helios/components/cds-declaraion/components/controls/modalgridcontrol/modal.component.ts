import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Observable, merge, BehaviorSubject, fromEvent} from 'rxjs';
import {MatSort, MatPaginator, MatDialog, MatTableDataSource, MatTable} from '@angular/material';
import {DeclarationService} from 'src/app/helios/service/declaration.service';
import {DataSource} from '@angular/cdk/table';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {AddDialogComponent} from '../dialogs/add/add.component';
import {OtherAdditionsAndDeductions} from 'src/app/helios/model/otheradditionsAndDeductions';
import {EditDialogComponent} from '../dialogs/edit/edit-dialog.component';

export interface Grid {
    index: number;
    code: string;
    currency: string;
    amount: number;
}

const ELEMENT_DATA: Grid[] = [];

@Component({selector: 'app-modalgrid', templateUrl: './modal.component.html', styleUrls: ['./modal.component.scss']})
export class ModalgridComponent implements OnInit {
    expanded = false;
    tableHeaderRow = 'Additions and Deductions';
    columns = ['code', 'currency', 'amount', 'add'];
    dataSource: MatTableDataSource<Grid>;
    additionCodeLookupInput: string;
    dataSourceIndex: number;
    tableRowIndex: number;

    @ViewChild(MatTable, {static: true})table : MatTable<any>;
    @ViewChild(MatPaginator, {static: false})paginator : MatPaginator;
    @ViewChild(MatSort, {static: true})sort : MatSort;

    constructor(public httpClient : HttpClient, public dialog : MatDialog, public dataService : DeclarationService) {}

    ngOnInit() {

        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSourceIndex = 0;
    }

    addRow() {
        this.doAddRow();
        this.expanded = false;
    }

    removeAt(index : number) {
        const data = this.dataSource.data;
        data.splice(index, 1);
        this.dataSource.data = data;
        this.expanded = false;
    }

    private doAddRow() {
        this.addNewDataSourceArrayObject();
        this.dataSourceIndex ++;
    }

    private addNewDataSourceArrayObject() {
        ELEMENT_DATA.push({index: this.dataSourceIndex, code: '', currency: '', amount: 0});
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
    }
}
