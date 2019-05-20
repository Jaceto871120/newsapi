import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../interfaces/interface';
import { environment } from 'src/environments/environment';

const apiKey = environment.apiKey;
const apiURL = environment.apiURL;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinesPage = 0;

  categoriaActual = '';
  categoriaPage = 0;

  constructor( private http: HttpClient) { }

  private ejecutarQuery<T>( query: string) {

    query = apiURL + query;
    return this.http.get<T>(query, {headers});
  }

  getTopHeadline() {

    this.headlinesPage++;
    // tslint:disable-next-line:max-line-length
    // return this.http.get<RespuestaTopHeadlines>(`https://newsapi.org/v2/top-headlines?country=us&apiKey=54d8e27c959d419fb2b88d2240ee963c`);
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&page=${this.headlinesPage}`);
  }

  getTopHeadlinesCategoria( categoria: string ) {

    if(this.categoriaActual === categoria) {
      this.categoriaPage++;
    } else {
      this.categoriaPage = 1;
      this.categoriaActual = categoria; 
    }
    // tslint:disable-next-line:max-line-length
    // return this.http.get<RespuestaTopHeadlines>(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=54d8e27c959d419fb2b88d2240ee963c`);
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&category=${ categoria }&page=${this.categoriaPage}`);
  }
}
