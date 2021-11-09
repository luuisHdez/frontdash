import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './home/register.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { CommonModule} from '@angular/common';


import  localesMX  from '@angular/common/locales/es-MX';
registerLocaleData(localesMX, 'es-MX');

import {MatSelectModule} from '@angular/material/select';
import { IndexUserComponent } from './home/index-user.component';

import {  Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { EditUserComponent } from './home/edit-user.component';
import { DownuserComponent } from './home/downuser/downuser.component';
import { EditarmetasComponent } from './home/editarmetas/editarmetas.component';
import { CreatemetasComponent } from './home/createmetas/createmetas.component';
import { IndexmetasComponent } from './home/indexmetas/indexmetas.component';
import { DeletemetasComponent } from './home/deletemetas/deletemetas.component';
import { GaugeChartComponent } from './home/gauge-chart/gauge-chart.component'; 

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AreaTendenciaComponent } from './home/area-tendencia/area-tendencia.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { IndexAreasComponent } from './home/index-areas/index-areas.component';
import { CrearAreasComponent } from './home/crear-areas/crear-areas.component';
import { EditarAreaComponent } from './home/editar-area/editar-area.component';
import { ProductosTendenciaComponent } from './home/productos-tendencia/productos-tendencia.component';
import { TendenciaComponent } from './home/tendencia/tendencia.component';
import { 
  IgxCategoryChartModule,
  IgxLegendModule
 } from "igniteui-angular-charts";
import { ActivateUserComponent } from './home/activate-user/activate-user.component';
import { DeleteAreasComponent } from './home/delete-areas/delete-areas.component';
 
 import { GaugeModule } from 'angular-gauge';
import { InitComponent } from './home/init/init.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NoPageFoundComponent,
    LoginComponent,
    RegisterComponent,
    IndexUserComponent,
    EditUserComponent,
    DownuserComponent,
    EditarmetasComponent,
    CreatemetasComponent,
    IndexmetasComponent,
    DeletemetasComponent,
    GaugeChartComponent,
    AreaTendenciaComponent,
    IndexAreasComponent,
    CrearAreasComponent,
    EditarAreaComponent,
    ProductosTendenciaComponent,
    TendenciaComponent,
    ActivateUserComponent,
    DeleteAreasComponent,
    InitComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatToolbarModule,MatSidenavModule,MatButtonModule,MatIconModule,
    MatDividerModule,
    CommonModule,
    MatCheckboxModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    GaugeModule,
    Ng2OrderModule,
    NgxChartsModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    IgxCategoryChartModule,
  IgxLegendModule,
  FormsModule,
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},
              {provide:LOCALE_ID, useValue:'es-MX' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
