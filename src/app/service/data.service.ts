import { Injectable } from '@angular/core';
import { Http ,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable'
import { Endpoint } from '../shared/endpoint';

@Injectable()
export class DataService {

  constructor(private http:Http) { }
  getPosts(count){;
    return this.http.get(Endpoint.api+'/'+count)
    .map(response=>response.json())
  }
}
