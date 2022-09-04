import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import { MensajesGenericos } from '../utils/mensajes';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class InterceptorHttpService implements HttpInterceptor {


    constructor(private matDialog: MatDialog) {
    }

    /**
     * Metodo encargado de interceptar transacciones http y agregarles el headers (encabezado de autorización con token jwt si está disponible).
     * @param  {HttpRequest<any>} request
     * @param  {HttpHandler} next
     * @return  {Observable<HttpEvent<any>>}
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const cloneReq = request.clone({
            setHeaders: {
               
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                 'Content-Type': 'application/json'
            }
        });
        return next.handle(cloneReq).pipe(
            map((event: HttpEvent<any>) => {
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            })
        );
    }


   

}
