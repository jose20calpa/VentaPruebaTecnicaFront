

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClienteConsulta } from '../models/ClienteConsulta.model';
import { ClienteRegistra } from '../models/ClienteRegistra.model';
import { Constantes } from '../utils/constantes';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    private http: HttpClient
  ) { 

  }
  crearCliente = (cliente:ClienteRegistra): Observable<any> => {
    return this.http.post(environment.apiVentas + Constantes.creaCliente, cliente, httpOptions)
  }
  consultarCliente = (consultaCLiente:ClienteConsulta) : Observable<any>=> {
    return this.http.post(environment.apiVentas + Constantes.consultaCliente, consultaCLiente, httpOptions)
  }

}