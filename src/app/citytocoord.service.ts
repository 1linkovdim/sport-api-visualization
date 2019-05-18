import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface Location {
  results: JSON;
}

@Injectable({
  providedIn: 'root'
})



export class CitytocoordService {

  constructor(private http: HttpClient) { }

  getLocation(city: string) {
    if(city.localeCompare("Washington") == 0) {
      city = city.concat(" DC");
    } else if(city.localeCompare("Sunrise") == 0) {
      city = city.concat(" Florida");
    } else if(city.localeCompare("Glendale") == 0 ) {
      city = city.concat(" Arizona");
    }
    const apistart = "https://maps.googleapis.com/maps/api/geocode/json?components=administrative_area:";
    const apiend = "&key=";
    var completeapicall = (apistart.concat(city)).concat(apiend);
    return this.http.get<Location>(completeapicall);
    
  }
}
