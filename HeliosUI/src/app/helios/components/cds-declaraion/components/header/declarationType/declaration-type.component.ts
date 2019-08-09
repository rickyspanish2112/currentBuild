import { Component, OnInit } from '@angular/core';
import { DeclarationService } from 'src/app/helios/service/declaration.service';
import { Declarationtype } from 'src/app/helios/model/declarationtypes';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-declaration-type',
  templateUrl: './declaration-type.component.html',
  styleUrls: ['./declaration-type.component.scss']
})
export class DeclarationTypeComponent implements OnInit {
  declarationTypes: Declarationtype[] = [];
  declarationTypes$: Observable<Declarationtype[]>;

  typeCtrl = new FormControl();

  constructor(private declarationService: DeclarationService ) { }

  ngOnInit() {
    this.getDeclarationTypes();


    this.declarationTypes$ = this.typeCtrl.valueChanges.pipe(
      map(type =>
        this.filteredTypes(type)
      )
    );

  }
  private filteredTypes(value: string): Declarationtype[] {
    const filterValue = value.toLowerCase();

    return this.declarationTypes.filter(
      state => state.value.toLowerCase().indexOf(filterValue) === 0
    );
  }



  getDeclarationTypes() {
    this.declarationService.getAllDeclarationTypes().subscribe(data => {
      return (this.declarationTypes = data);
    });
  }

}
