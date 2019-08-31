import { Component, OnInit } from '@angular/core';
import { DeclarationService } from 'src/app/helios/service/declaration.service';
import { Declarationtype } from 'src/app/helios/model/declarationtypes';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Badge } from 'src/app/helios/model/badges';

@Component({
  selector: 'app-declaration-type',
  templateUrl: './declaration-type.component.html',
  styleUrls: ['./declaration-type.component.scss']
})
export class DeclarationTypeComponent implements OnInit {
  declarationTypes: Declarationtype[] = [];
  declarationTypes$: Observable<Declarationtype[]>;

  badges: Badge[] = [];
  badges$: Observable<Badge[]>;

  typeCtrl = new FormControl();
  badgeCtrl = new FormControl();

  constructor(private declarationService: DeclarationService ) { }

  ngOnInit() {
    this.getDeclarationTypes();
    this.getBadges();

    this.declarationTypes$ = this.typeCtrl.valueChanges.pipe(
      map(type =>
        this.filteredTypes(type)
      )
    );

    this.badges$ = this.badgeCtrl.valueChanges.pipe(
      map(badge => this.filteredBadge(badge))
    );

  }

  private  filteredBadge(value: string): Badge[] {
    const filterValue = value.toLocaleLowerCase();

    return this.badges.filter(
      badge => badge.code.toLowerCase().indexOf(filterValue) === 0
    );
  }
  private filteredTypes(value: string): Declarationtype[] {
    const filterValue = value.toLowerCase();

    return this.declarationTypes.filter(
      state => state.value.toLowerCase().indexOf(filterValue) === 0
    );
  }

getBadges() {
this.declarationService.getAllBadges().subscribe(data => {
  return (this.badges = data);
});
}

  getDeclarationTypes() {
    this.declarationService.getAllDeclarationTypes().subscribe(data => {
      return (this.declarationTypes = data);
    });
  }

}
