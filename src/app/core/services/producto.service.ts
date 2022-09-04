
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Producto } from '../models/Producto.model';
import { ProductoConsulta } from '../models/ProductoConsulta.model';
import { Constantes } from '../utils/constantes';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(
    private http: HttpClient
  ) { 

  }
  crearProducto = (producto:Producto) => {
    return this.http.post(environment.apiVentas + Constantes.creaProducto, producto, httpOptions)
  }
  consultarProducto = (producto:ProductoConsulta) => {
    return this.http.post(environment.apiVentas + Constantes.consultaProducto, producto, httpOptions)
  }

}