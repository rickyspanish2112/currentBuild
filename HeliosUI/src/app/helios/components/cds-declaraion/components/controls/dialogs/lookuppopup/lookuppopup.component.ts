import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AdditionsAndDeductionsCode } from 'src/app/helios/model/additionsAndDeductionCode';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-lookuppopup',
  templateUrl: './lookuppopup.component.html',
  styleUrls: ['./lookuppopup.component.scss']
})
export class LookuppopupComponent implements OnInit {
  errorMessage: string;
  toggleLookupElement = false;
  additionsAndDeductions: AdditionsAndDeductionsCode[] = [];
  selectedAdditionsAndDeductions: AdditionsAndDeductionsCode;
  selectedadditionsAndDeductionCode: string;
  codeFilter: string;
  additionsAndDeductionsLookupInput: string;
  // countryModalDialogLookupInput: any;

  dummyCodes: AdditionsAndDeductionsCode[] = [
    {code: 'AB', description: 'Commissions and brokerage, except buying commissions - amount'},
    {code: 'AC', description: 'Commissions and brokerage, except buying commissions - percentage'},
    {code: 'BH', description: 'Discount - amount'},
    // tslint:disable-next-line: max-line-length
    {code: 'BK', description: 'Deductions based on a decision granted in accordance with Article 71 of Delegated Regulation (EU) 2015/2446 - percentage'},
  ];

  additionsAndDeductionsLookupExpandingDialogForm = new FormControl();
  additionsAndDeductionsLookupExpandingDialogFormGroup: FormGroup = this.fb.group({
    codeFC: ''
  });

  countryCtrl = new FormControl();
  rows: AdditionsAndDeductionsCode[];
  displayedColumns = ['code'];
  dataSource = new MatTableDataSource(this.rows);

  @Output() closeLookup: EventEmitter<boolean> = new EventEmitter();
  @Output() setAdditionalCodeValue: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.additionsAndDeductions = this.dummyCodes;

    this.additionsAndDeductionsLookupExpandingDialogFormGroup.get('codeFC').valueChanges
    .subscribe(val => {
      this.codeFilter = val;

      this.applyAllFilters();
    });
  }

  clearAll = () => {
    this.additionsAndDeductionsLookupExpandingDialogFormGroup.reset();
  }

  private applyAllFilters = () => {
    let rows;
  /*   this.dummyCodes.getAllCountries().subscribe(data => {
      return (this.countries = data);
    });
 */
    if (!!this.codeFilter) {
      rows = this.additionsAndDeductions.filter(r => r.code.toLowerCase().startsWith(this.codeFilter.toLowerCase()));
    }
    this.dataSource = rows;
  }

}
