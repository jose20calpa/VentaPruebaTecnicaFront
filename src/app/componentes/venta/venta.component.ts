import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/core/models/Cliente.model';
import { ClienteConsulta } from 'src/app/core/models/ClienteConsulta.model';
import { ProductoConsulta } from 'src/app/core/models/ProductoConsulta.model';
import { ProductoRegistra } from 'src/app/core/models/ProductoRegistra.model';
import { ProductoVenta, VentaRegistra } from 'src/app/core/models/VentaRegistra.model';
import { ClienteService } from 'src/app/core/services/cliente.service';
import { ProductoService } from 'src/app/core/services/producto.service';
import { VentaService } from 'src/app/core/services/venta.service';
import { ClienteComponent } from '../cliente/cliente.component';
import { ProductoComponent } from '../producto/producto.component';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.scss']
})
export class VentaComponent implements OnInit {
  form: FormGroup;
  total:number=0;
  nombre:string= '';
  apellido:string= '';
  idCliente: number = 0;
  textCedula = new FormControl({ value: '', disabled: false },{nonNullable: true});
  displayedColumns: string[] = ['producto', 'cantidad','valorUnitario','subtotal','eliminar' ];
  arregloProducto:ProductoRegistra[]= []
  dataSource: MatTableDataSource<any> = new MatTableDataSource<ProductoRegistra>(this.arregloProducto);
  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private productoService: ProductoService,
    private ventaService: VentaService,
  ) {
    this.form = this.formBuilder.group({
      producto: ['',Validators.required],
      cantidad: ['',Validators.required],
    });
  }

  ngOnInit(): void {

  }

  crearProducto(){
    this.dialog.open(ProductoComponent, {
      width:'40vw'
    });
  }
  crearCliente(){
    this.dialog.open(ClienteComponent, {
      width:'40vw'
    });
  }


  consultarProducto(){
    const consultaProducto: ProductoConsulta ={
      id:this.form.value.producto
    } 
    this.productoService.consultarProducto(consultaProducto).subscribe(
      (res:any)=>{
        if (res.ok){
          console.log(res)
          const producto:ProductoRegistra = {
            idProducto : res.objeto.id,
            cantidad:this.form.value.cantidad,
            nombre:res.objeto.nombre,
            valorUnitario:res.objeto.valor,
            subtotal: res.objeto.valor * this.form.value.cantidad
          }
          this.arregloProducto.push(producto)

          this.total = this.arregloProducto.reduce(
            (acc,el) =>acc+el.subtotal,0
          )

          this.dataSource = new MatTableDataSource(this.arregloProducto)
        }else{
          alert(res.mensaje)
        }
    },(err:any)=>{
      alert("se ha presentado un error buscando el producto")
    }
    )
  }

  

  consultarCliente(){
    const cedula = this.textCedula.value
    const consultaCliente: ClienteConsulta ={
      cedula:this.textCedula.value
    } 
    this.clienteService.consultarCliente(consultaCliente).subscribe(
      (res)=>{
        if (res.ok){
          this.nombre = res.objeto.nombre;
          this.apellido = res.objeto.apellido;
          this.idCliente = res.objeto.id
        }
      },
      (err)=>{
        
      }
    )
  }

  registrarVenta(){
    if(this.idCliente == 0){
      alert('Por favor busque un cliente');
      return;
    }
    if(this.arregloProducto.length == 0){
      alert('Por favor registre productos');
      return;
    }
    const listaProdcuto: ProductoVenta [] = [];
    
    this.arregloProducto.forEach(
      prod=>{
        listaProdcuto.push({
          cantidad: prod.cantidad,
          idProducto:prod.idProducto
        })
      }
    )
    const venta:VentaRegistra ={
      productos : listaProdcuto,
      idCliente: this.idCliente,
      totalVenta:this.total
    }
    this.ventaService.crearVenta(venta).subscribe(
      (res:any)=>{
        console.log(res)
        if(res.ok){
          alert(res.mensaje)
        }
      },
      (err)=>{
        console.log(err);
        alert('Se ha presentado un error registrando la venta')

      }
    )
  }

  eliminarProducto(posicion:any, element:any){
    this.total = this.total - element.subtotal 
    this.arregloProducto.splice(this.arregloProducto.indexOf(element), 1);
    this.dataSource = new MatTableDataSource(this.arregloProducto)
  }

}
