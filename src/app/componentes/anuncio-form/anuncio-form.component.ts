import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCardHeader, IonCardTitle, IonInput, IonButton, IonItem, IonCard, IonImg } from "@ionic/angular/standalone";
import { Camera, CameraResultType } from '@capacitor/camera';
import { FormsModule } from '@angular/forms';
import { AnunciosService } from 'src/app/servicios/anuncios.service';
import { Anuncio } from 'src/app/modelo/anuncio';

@Component({
  selector: 'app-anuncio-form',
  templateUrl: './anuncio-form.component.html',
  styleUrls: ['./anuncio-form.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, IonCardHeader, IonCardTitle, IonInput, IonButton, IonItem, IonCard, IonImg]

})
export class AnuncioFormComponent implements OnInit {
  tituloStr: string = "";
  descripcionStr: string = "";
  fotoAnuncioStr: string = "";
  fechaCreacionAnuncioStr: string = new Date().toLocaleString();

  // Evento para emitir el mensaje al componente padre
  @Output() enviarDatos: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() { }
  // funcion que tomara los datos del formulario y los pasara al componente padre (crear-avisos.page)
  async crearAnuncio() {

    const nuevoAnuncio: Anuncio = {
      titulo: this.tituloStr,
      descripcion: this.descripcionStr,
      fotografia: this.fotoAnuncioStr,
      fecha: this.fechaCreacionAnuncioStr

    };
    this.enviarDatos.emit(nuevoAnuncio)
  }

  async tomarFotoAviso() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64
    })

    if (image.base64String != null || image.base64String != undefined) {
      this.fotoAnuncioStr = image.base64String
    }
  }
}
