import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeliosComponent } from './helios.component';
import { MaterialModule } from '../shared/material.module';

import { MAT_DATE_LOCALE } from '@angular/material/core';

import { SidenavComponent } from './components/sidnav/sidenav.component';
import { Routes, RouterModule } from '@angular/router';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { CdsDeclarationComponent } from './components/cds-declaraion/cds-declaration.component';

import {DeclarationService} from './service/declaration.service';
import { HttpClientModule } from '@angular/common/http';
import { ListService } from './service/list.service';
import { HeaderComponent } from './components/cds-declaraion/components/header/header.component';
import { DeclarationTypeComponent } from './components/cds-declaraion/components/header/declarationType/declaration-type.component';
import { DateControlComponent } from './components/cds-declaraion/components/controls/dateControl/date-control.component';
import { TransportInfoComponent } from './components/cds-declaraion/components/header/transportInfo/transport-info.component';
import { ValuebuildupComponent } from './components/cds-declaraion/components/header/valueBuildup/valuebuildup.component';


const routes: Routes = [
  {
    path: '',
    component: HeliosComponent,
    children: [
      /*       { path: 'account', component: MainContentComponent },
      { path: 'addresses', component: AddressesComponent },
      { path: 'contacts', component: ContactsComponent }, */
      { path: 'declarations', component: CdsDeclarationComponent },
      { path: '', component: CdsDeclarationComponent }
    ]
  },

  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    HeliosComponent,
    SidenavComponent,
    ToolbarComponent,
    CdsDeclarationComponent,
    HeaderComponent,
    DeclarationTypeComponent,
    DateControlComponent,
    TransportInfoComponent,
    ValuebuildupComponent
  ],
  imports: [CommonModule,
    HttpClientModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
    providers: [
      DeclarationService,
      ListService,
      {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    ],
})
export class HeliosModule {}
