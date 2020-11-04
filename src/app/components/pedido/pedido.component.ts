import { Component, OnInit } from '@angular/core';
import { pedido } from 'src/app/model/pedido/pedido';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';





@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: []
})
export class PedidoComponent implements OnInit {

  pedido: pedido = {
    nombre : "",
    monto : 0,
    descuento: 0
  };

  constructor(private httpClient : HttpClient,
              private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  addPedido(){
    if(!this.pedido.nombre){
      this.toastr.error("El Pedido debe tener un nombre");
      return;
    }

    if(!this.pedido.monto || this.pedido.monto < 0){
      this.toastr.error("El pedido debe tener un monto mayor a cero"); 
      return; 
    }

    this.httpClient.post("http://localhost:8080/pedidos", this.pedido)
        .subscribe( response => {
          this.toastr.success("Pedido cargado con éxito.")
        }, error => {
          if(error.error.errorMessage === undefined)
             error.error.errorMessage = "";
          this.toastr.error("Ocurrió un error al agregar el Pedido " + error.error.errorMessage);
        })
  }
}
