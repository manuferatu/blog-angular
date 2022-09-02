//Imports necesarios
import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

//Importar componentes
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';

//Definimos las rutas
const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'inicio', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegisterComponent},

  {path: '**', component: ErrorComponent},

];

//Exportamos las rutas para poder trabajar con ellas
export const appRoutingProviders: any[] = []; //para cargar el routing como servicio
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes); //el modulo del router, se cargara en el app module


