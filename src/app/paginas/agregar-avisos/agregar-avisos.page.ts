import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnuncioFormComponent } from 'src/app/componentes/anuncio-form/anuncio-form.component';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonButton } from '@ionic/angular/standalone';
import { AnunciosService } from 'src/app/servicios/anuncios.service';

@Component({
  selector: 'app-agregar-avisos',
  templateUrl: './agregar-avisos.page.html',
  styleUrls: ['./agregar-avisos.page.scss'],
  standalone: true,
  imports: [AnuncioFormComponent, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonBackButton, IonButtons, IonButton]
})
export class AgregarAvisosPage implements OnInit {

  constructor(private anuncioService: AnunciosService) { }

  ngOnInit() {
  }

  // Evento que maneja los anuncios enviados por el hijo
  async recibirAnuncio(anuncio: any) {
    await this.anuncioService.agregarAnuncio(anuncio)
    console.log("anuncio recibido al componente Padre", anuncio)
  }
}
