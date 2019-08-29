import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";

export interface IWeatherdata {
  "Datum": string;
  "Zeit": string;
  "Temp. A.": number;
  "Temp. 3": number;
  "Feuchte A.": number;
  "Luftdruck": number;
  "Regen": number;
  "Wind": number;
  "Richtung": number;
  "Helligkeit": number;
}

@Injectable()
export class WeatherdataService {

  constructor(private http: Http) { }

  getWeatherdata(): Observable<IWeatherdata[]> {
    return this.http.get("./assets/weatherdata.json")
        .map(res => {
            let data = res.json();
            return data;
        })
        .catch((err: Response) => Observable.of(err.json()));
    }
    
}
