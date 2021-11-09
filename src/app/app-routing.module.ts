import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { RegisterComponent } from './home/register.component';
import { AuthGuard } from './auth.guard';
import { IndexUserComponent } from './home/index-user.component';
import { EditUserComponent } from './home/edit-user.component';
import { DownuserComponent } from './home/downuser/downuser.component';
import { CreatemetasComponent } from './home/createmetas/createmetas.component';
import { IndexmetasComponent } from './home/indexmetas/indexmetas.component';
import { EditarmetasComponent } from './home/editarmetas/editarmetas.component';
import { DeletemetasComponent } from './home/deletemetas/deletemetas.component';
import { GaugeChartComponent } from './home/gauge-chart/gauge-chart.component';
import { AreaTendenciaComponent } from './home/area-tendencia/area-tendencia.component';
import { IndexAreasComponent } from './home/index-areas/index-areas.component';
import { CrearAreasComponent } from './home/crear-areas/crear-areas.component';
import { EditarAreaComponent } from './home/editar-area/editar-area.component';
import { ProductosTendenciaComponent } from './home/productos-tendencia/productos-tendencia.component';
import { TendenciaComponent } from './home/tendencia/tendencia.component';
import { ActivateUserComponent } from './home/activate-user/activate-user.component';
import { DeleteAreasComponent } from './home/delete-areas/delete-areas.component';
import { InitComponent } from './home/init/init.component';


const routes: Routes = [
  {path: '', component: HomeComponent,
  children:[
    {path: 'register', component: RegisterComponent},
    {path: 'index-user', component: IndexUserComponent},
    {path: 'edituser',component: EditUserComponent},
    {path: 'edituser/:id',component: EditUserComponent},
    {path: 'down-user/:id', component: DownuserComponent},
    {path: 'index-metas', component: IndexmetasComponent},
    {path: 'create-metas', component: CreatemetasComponent},
    {path: 'edit-metas', component: EditarmetasComponent},
    {path: 'edit-metas/:id', component: EditarmetasComponent},
    {path: 'create-metas', component: CreatemetasComponent},
    {path: 'delete-metas/:id', component:DeletemetasComponent},
    {path: 'index-tendencia', component:GaugeChartComponent},
    {path: 'areatendencia', component: AreaTendenciaComponent},
    {path: 'index-areas', component: IndexAreasComponent},
    {path: 'crear-area', component: CrearAreasComponent},
    {path: 'editar-area/:id', component: EditarAreaComponent},
    {path: 'productos-tendencia', component: ProductosTendenciaComponent},
    {path: 'tendencia', component: TendenciaComponent},
    {path: 'activate-user/:id', component: ActivateUserComponent},
    {path: 'delete-area/:id', component: DeleteAreasComponent},
    {path:'init', component:InitComponent}
     
  ],
   canActivate: [AuthGuard]
  },
  {path: 'login', component: LoginComponent},
  {path: '**', component: NoPageFoundComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
}) 
export class AppRoutingModule { }
