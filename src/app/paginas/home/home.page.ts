import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonFooter, IonIcon } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { settingsOutline, addCircleOutline } from 'ionicons/icons'
import { AnuncioListComponent } from 'src/app/componentes/anuncio-list/anuncio-list.component';
import { AnunciosService } from 'src/app/servicios/anuncios.service';
import { Anuncio } from 'src/app/modelo/anuncio';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [AnuncioListComponent, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonFooter, IonIcon, RouterModule],
})
export class HomePage {

  listaAnuncios: Anuncio[] = []
  private routerSubscription?: Subscription;


  constructor(
    // Los servicios se inyectan como parametros del constructor
    private anuncioService: AnunciosService,
    private router: Router
  ) {
    addIcons({ addCircleOutline, settingsOutline });
  }


  async ngOnInit() {
    console.log("Hola")
    await this._actualizar()
  }

  async _actualizar() {
    await this.anuncioService.iniciarPlugin()
    this.listaAnuncios = await this.anuncioService.getAnuncios()
  }

  ngAfterViewInit(): void {
    // Escuchar los eventos de navegación del Router
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // Aquí puedes ejecutar la lógica que deseas cada vez que se navega a esta ruta
        this.ngOnInit();  // Llamar a ngOnInit nuevamente
      }
    });
  }

}
