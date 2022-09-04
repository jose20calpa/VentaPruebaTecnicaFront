import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'venta',
    loadChildren: () => import('./componentes/venta/venta.module').then(m => m.VentaModule)
  },
  {
    path: '**',
    redirectTo: 'venta', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
