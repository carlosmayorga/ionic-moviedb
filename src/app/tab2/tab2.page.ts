import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar = '';
  buscando: boolean;
  peliculas: Pelicula[] = [];
  ideas: string[] = ['Iron Man', 'Avengers', 'Thor'];

  constructor(private moviesService: MoviesService,
              private modalCtrl: ModalController) {}

  buscar(event) {
    let valor: string = event.detail.value;
    valor = valor.trim();

    if (valor.length === 0 || valor === '') {
      this.buscando = false;
      this.peliculas = [];
      return;
    }
    this.buscando = true;

    this.moviesService.buscarPeliculas(valor)
      .subscribe(resp => {
        this.peliculas = resp.results;
        this.buscando = false;
      });
  }

  async detalle(id: string) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });
    modal.present();
  }

}
