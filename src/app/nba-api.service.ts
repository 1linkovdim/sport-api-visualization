import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


interface Information {
  teams: any;
  api: any; 
}

interface CityList {
  cities: []
}

@Injectable({
  providedIn: 'root'
})

export class NBAApiService {

  constructor(private http: HttpClient) { }

  getTeamInformation() {

    const headerDict = {
      "X-RapidAPI-Host": "free-nba.p.rapidapi.com",
      "X-RapidAPI-Key": ""
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    

    return this.http.get<Information>('https://free-nba.p.rapidapi.com/teams', requestOptions)
  }

  getPlayerInformation() { 
    const api_address = 'http://localhost:5002/'
    return this.http.get<CityList>(api_address)
  }
  
}
