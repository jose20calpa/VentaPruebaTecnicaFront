import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentaComponent } from './venta.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MaterialModule } from 'src/app/shared/material.module';
import { ProductoComponent } from '../producto/producto.component';
import { ClienteComponent } from '../cliente/cliente.component';
import { VentaRoutingModule } from './venta-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    VentaComponent,
    ProductoComponent,
    ClienteComponent],
  imports: [
    CommonModule,
    VentaRoutingModule,
    MaterialModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class VentaModule { }
