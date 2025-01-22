import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./paginas/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'agregar-avisos',
    loadComponent: () => import('./paginas/agregar-avisos/agregar-avisos.page').then(m => m.AgregarAvisosPage)
  },
];
