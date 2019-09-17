import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeclarationService } from 'src/app/helios/service/declaration.service';
import { OtherAdditionsAndDeductions } from 'src/app/helios/model/otheradditionsAndDeductions';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddDialogComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: OtherAdditionsAndDeductions,
              public dataService: DeclarationService) { }

              formControl = new FormControl('', [
                Validators.required
                // Validators.email,
              ]);

  ngOnInit() {
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.dataService.addAdditionAndDeduction(this.data);
  }

}


