import { Component, OnInit } from '@angular/core';
import {SearchService, IWeatherdata, ISearchResultItem} from "../core/services/search.service";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public itemsAngular2$: Observable<ISearchResultItem[]>;
  public itemsTypescript$: Observable<ISearchResultItem[]>;
  public itemsWeather$: Observable<ISearchResultItem[]>;
  public itemsWeatherdata: IWeatherdata[] = [];
  public weatherObject: IWeatherdata[] = [];

  constructor(private _searchService: SearchService) { }

  ngOnInit() {
    console.log('dashboard.component is initialized');
    this.itemsAngular2$ = this._searchService.search("angular2", 10);
    this.itemsTypescript$ = this._searchService.search("typescript", 10);
    this.itemsWeather$ = this._searchService.search("weather", 5)
    this.handleWeatherdata();
  }

  // returns a whole randomized number between min and max.
  randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // stores randomized Weatherdata five at a time.
  randomizeWeatherdata(data: IWeatherdata[]) {
    while (this.itemsWeatherdata.length <= 4) {
      let randomNum = this.randomNumber(0, 5759);
      let randomWeatherdata = data[randomNum];
      if (!this.itemsWeatherdata.includes(randomWeatherdata)) {
        this.itemsWeatherdata.push(randomWeatherdata);
      }
    }
  }

  // injects Object from itemsWeatherdata in order into weatherObject with delay. repeats itself when run through. 
  setWeatherdata(randomizedData: IWeatherdata[]) {
    (function getWeatherObject(index = 0) {
      console.log('start IIFE at index ' + index)
      this.weatherObject[0] = randomizedData[index];
      console.log(this.weatherObject);
      index < randomizedData.length - 1 
      ? setTimeout(getWeatherObject.bind(this), 20000, index += 1) // binds this for itemsWeatherdata
      : setTimeout(getWeatherObject.bind(this), 20000, index = 0); // binds this for itemsWeatherdata
    }).bind(this)() // binds the index
  } 

  // handles Weatherdata from search.service
  handleWeatherdata() {
    return this._searchService.getWeatherdata()
      .subscribe (
        res => {
        this.randomizeWeatherdata(res);
        this.setWeatherdata(this.itemsWeatherdata);
        },
        err => console.error('error at handleWeatherdata() in dashboard.component.ts ' + err)      
      )
  }

}
