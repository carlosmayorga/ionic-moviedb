import { Injectable, Query } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaTMDB } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment.prod';

const URL = environment.url;
const APIKEY = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) {}

  getFeature() {
    const hoy = new Date();
    const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
    const mes = hoy.getMonth() + 1;

    let mesString: string | number;

    if (mes < 10) {
      mesString = '0' + mes;
    } else {
      mesString = mes;
    }

    const inicio = `${ hoy.getFullYear() }-${ mesString }-01`;
    const fin = `${ hoy.getFullYear() }-${ mesString }-${ ultimoDia }`;

    return this.ejecutarQuery<RespuestaTMDB>(`/discover/movie?primary_release_date.gte=${ inicio }&primary_release_date.lte=${ fin }`);
  }

  /****************
   Private and utils
   ****************/
  private ejecutarQuery<T>(query: string) {
    query = URL + query;
    query += `&api_key=${ APIKEY }&language=es&include_image_language=es`;
    return this.http.get<T>(query);
  }
}
