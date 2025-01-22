import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonImg, IonButton, IonItem, IonList, IonLabel, IonIcon } from '@ionic/angular/standalone'
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';
import { Anuncio } from 'src/app/modelo/anuncio';
@Component({
  selector: 'app-anuncio-list',
  templateUrl: './anuncio-list.component.html',
  styleUrls: ['./anuncio-list.component.scss'],
  standalone: true,
  imports: [IonImg, IonButton, IonItem, IonList, IonLabel, CommonModule, IonIcon]
})
export class AnuncioListComponent implements OnInit {



  @Input() anuncios: Anuncio[] = []
  id?: number
  fecha = new Date()

  constructor() {
    addIcons({ trashOutline });
  }

  async ngOnInit() {
    await console.log("lists cargada desde el hijo", this.anuncios)
  }

  onClick() {
    console.log("eliminar anuncio")
  }
}
