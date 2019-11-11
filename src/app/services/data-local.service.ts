import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { DetallePelicula } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  peliculas: DetallePelicula[] = [];

  constructor(private storage: Storage,
              private toastCtrl: ToastController) {}

  guardarPelicula(pelicula: DetallePelicula) {

    let mensaje = '';

    const existe = this.peliculas.find(peli => peli.id === pelicula.id);

    if (existe) {
      this.peliculas = this.peliculas.filter(peli => peli.id !== pelicula.id);
      mensaje = 'Removida de favoritos';
    } else {
      this.peliculas.push(pelicula);
      mensaje = 'Agregada a favoritos';
    }

    this.storage.set('peliculas', this.peliculas);
    this.presentToast(mensaje);

    return !existe;
  }

  async cargarFavoritos() {
    const peliculas = await this.storage.get('peliculas');
    this.peliculas = peliculas || [];

    return this.peliculas;
  }

  async existePelicula(id) {
    id = Number(id);

    await this.cargarFavoritos();
    const existe = this.peliculas.find(peli => peli.id === id);

    return (existe) ? true : false;
  }


  /****************
   Private and utils
   ****************/

  private async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }

}
