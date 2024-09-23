import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  
  {
    path: 'home',
    loadChildren: () => import('./pages/main/home/home.module').then(m => m.HomePageModule)
  },

  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/auth/sign-up/sign-up.module').then(m => m.SignUpPageModule)
  },
  {
    path: 'pantalla-principal',
    loadChildren: () => import('./pages/main/pantalla-principal/pantalla-principal-routing.module').then(m => m.PantallaPrincipalPageRoutingModule)
  },


  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then( m => m.MainPageModule)
  },
  {
    path: 'scan',
    loadChildren: () => import('./pages/main/scan/scan.module').then( m => m.ScanPageModule)
  },
  {
    path: 'historial',
    loadChildren: () => import('./pages/main/historial/historial.module').then(m => m.HistorialPageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./pages/main/map/map.module').then(m => m.MapPageModule)
  },
  {
    path: 'aws',
    loadChildren: () => import('./pages/aws/aws/aws.module').then( m => m.AwsPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
