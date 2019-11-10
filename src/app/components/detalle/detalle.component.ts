import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { DetallePelicula, Cast } from 'src/app/interfaces/interfaces';
import { Constant } from '../utils/constant';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id: string;
  pelicula: DetallePelicula = {};
  actores: Cast[] = [];
  oculto = 100;
  slideOpts = Constant.SLIDE_OPT_ACTORS;


  constructor(private moviesService: MoviesService,
              private modalCtrl: ModalController) {}

  ngOnInit() {
    this.moviesService.getPeliculaDetalle(this.id)
      .subscribe(resp => {
        this.pelicula = resp;
      });

    this.moviesService.getActoresDetalle(this.id)
      .subscribe(resp => {
        this.actores = resp.cast;
      });
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  favorito() {

  }

}
