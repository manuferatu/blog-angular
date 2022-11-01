import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";// this module allow us collect the data returned by the API
import { User } from "../models/user";
import { global } from "./global";

@Injectable()// to use as a service and dependency injection
export class UserService {
  public url: string;
  public identity: any;
  public token: any;

  constructor(
    public _http: HttpClient
  ){
    this.url = global.url;

  }
  test(){
    return "Hola mundo desde un servicio";
  }

  //este metodo devuelve un obserbable de tipo any
  register(user:User): Observable<any>{
    let json = JSON.stringify(user);//We convert the object into a JSON string so that they can travel to the backend
    let params = 'json='+json;

    //Definimos las cabeceras
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.post(this.url+'register', params, {headers: headers} );//Esto hara la peticion AJAX y devolvera un obserbable donde tendremos los datos que me devolvera el API o lo errores
  }

  signup(user:any, gettoken = false): Observable<any>{
    if(gettoken != false){
      user.gettoken = 'true';
    }

    let json = JSON.stringify(user);
    let params = 'json='+json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.post(this.url+'login', params, {headers: headers});
  }

  update(token:any, user:User): Observable<any>{
    user.description = global.htmlEntities(user.description);// clear field content htmlentities -> utf8
    let json = JSON.stringify(user);
    let params = "json="+json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                   .set('Authorization', token);

    return this._http.put(this.url + 'user/update', params, {headers: headers});

  }

  //Metodos para sacar los datos almacenados en el localstorage del navegador web

  getIdentity(){
    let identity = JSON.parse(localStorage.getItem('identity') || '{}');

    if(identity && identity != 'undefined'){
      this.identity = identity;
    }else{
      this.identity = null;
    }

    return this.identity;
  }

  getTocken(){

    let token = localStorage.getItem('token');

    if(token && token != 'undefined'){
      this.token = token;
    }else{
      this.token = null;
    }
    return this.token;
  }
}
