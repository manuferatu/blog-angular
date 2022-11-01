import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { global } from "./global";

@Injectable()
export class PostService {
  public url: string;
  public identity: any;
  public token: any;

  constructor(
    public _http: HttpClient
  ) {
    this.url = global.url;

  }

  create(token: any, post: any): Observable<any> {
    post.content = global.htmlEntities(post.content);// clear field content htmlentities -> utf8
    let json = JSON.stringify(post) //We convert the javescript Json object into a string to send  it through the http protocol
    let params = "json=" + json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.post(this.url + 'post', params, { headers: headers });
  }

  //returns an observable object of type any
  getPosts(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'post', { headers: headers });
  }

  getPost(id: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'post/' + id, { headers: headers });

  }

  update(token: any, post: any, id: any): Observable<any> {
    post.content = global.htmlEntities(post.content);// clear field content htmlentities -> utf8
    let json = JSON.stringify(post);
    let params = "json=" + json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.put(this.url + 'post/' + id, params, { headers: headers });
  }

  delete(token: any, id: any) {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                   .set('Authorization', token);

    return this._http.delete(this.url + 'post/' + id, {headers: headers});
  }


}
