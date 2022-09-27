import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Post } from '../models/post';
import { global } from "./global";

@Injectable()
export class PostService{
  public url: string;
  public identity: any;
  public token: any;

  constructor(
    public _http: HttpClient
  ){
    this.url = global.url;

  }




}
