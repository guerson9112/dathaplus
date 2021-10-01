import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
const API_URL = environment.RemotePlusUrl;
@Injectable({
  providedIn: 'root'
})
export class RemoteplusService {

  constructor(private http: HttpClient) {
    
  }

 getApiRemote(){
   return this.http.get<any>( `${API_URL}`).toPromise();
 }

 createApiRemote(id: string, datos: any){
  let news: any = {
    userId:id,
    name: datos.name,
    lastname: datos.lastname,
  }

  return this.http.post<any>(`${API_URL}`, news)
  .pipe(map( res => {
    
    return res;
  
  }));
 }

 updateApiRemote(id: number, datos: any){
  let news: any = {
    userId:id,
    name: datos.name,
    lastname: datos.lastname,
  }

  return this.http.post<any>(`${API_URL}`, news)
  .pipe(map( res => {
    
    return res;
  
  }));
 }


 delteApiRemote(id: string){

  return this.http.delete<any>(`${API_URL}/${id}`)
  .pipe(map( res => {
    
    return res;
  
  }));
 }



}
