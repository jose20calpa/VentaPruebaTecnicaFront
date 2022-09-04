


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ClienteRegistra } from '../models/ClienteRegistra.model';
import { VentaRegistra } from '../models/VentaRegistra.model';
import { Constantes } from '../utils/constantes';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor(
    private http: HttpClient
  ) { 

  }
  crearVenta = (venta:VentaRegistra) => {
    return this.http.post(environment.apiVentas + Constantes.creaVenta, venta, httpOptions)
  }
  
}