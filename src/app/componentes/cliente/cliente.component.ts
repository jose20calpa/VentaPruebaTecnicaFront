import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ClienteRegistra } from 'src/app/core/models/ClienteRegistra.model';
import { ClienteService } from 'src/app/core/services/cliente.service';

@Component({
  selector: 'app-Cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private clienteService:ClienteService,
    public dialogref: MatDialogRef<ClienteComponent>,
  ) {
    this.form = this.formBuilder.group({
      nombre: ['',Validators.required],
      apellido: ['',Validators.required],
      cedula: ['',Validators.required],
    });
  }

  ngOnInit(): void {

  }


  crearCliente(){
    const cliente = new ClienteRegistra();
    cliente.cedula=this.form.value.cedula;
    cliente.nombre=this.form.value.nombre;
    cliente.apellido=this.form.value.apellido;
    this.clienteService.crearCliente(cliente).subscribe(
      (res:any)=>{
        console.log(res)

        if (res.ok){
          alert('Cliente creado satisfacatoriamente')
          this.dialogref.close();
        }else{
          alert('Se ha presentado un error, intente nuevamente')
        }
      },(err:any)=>{
        alert('Se ha presentado un error, intente nuevamente')

        console.log(err)
      }

    )
  }

}
