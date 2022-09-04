import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Producto } from 'src/app/core/models/Producto.model';
import { ProductoRegistra } from 'src/app/core/models/ProductoRegistra.model';
import { ProductoService } from 'src/app/core/services/producto.service';

@Component({
  selector: 'app-Producto',
  templateUrl: './Producto.component.html',
  styleUrls: ['./Producto.component.scss']
})
export class ProductoComponent implements OnInit {

  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private productoService:ProductoService,
    public dialogref: MatDialogRef<ProductoComponent>,
  ) {
    this.form = this.formBuilder.group({
      nombre: ['',Validators.required],
      valorUnitario: ['',Validators.required],
    });
  }

  ngOnInit(): void {

  }
  guardarProducto(){
    console.log(this.form.value)
  }

  crearProducto(){
    const producto = new Producto();
    producto.nombre=this.form.value.nombre;
    producto.valor =this.form.value.valorUnitario;
    this.productoService.crearProducto(producto).subscribe(
      (res:any)=>{
        console.log(res)

        if (res.ok){
          alert('Producto creado satisfacatoriamente');
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
