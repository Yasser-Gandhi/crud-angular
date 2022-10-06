import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //Creamos el constructor para poder usar el HttpClient
  constructor(private http : HttpClient) { }

  postLesson(data : any){
    /*Le pasamos la url y el objeto que proviene del formulario*/

    return this.http.post<any>('http://localhost:3000/listadoClases', data);
  }

  getLessons(){
    return this.http.get<any>('http://localhost:3000/listadoClases');
  }
}
