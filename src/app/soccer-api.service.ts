import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface Information {
  teams: any;
  api: any;
}

@Injectable({
  providedIn: 'root'
})

export class SoccerAPIService {

  constructor(private http: HttpClient) { }

  getTeamInformation(id: number) {

    const headerDict = {
      "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      "X-RapidAPI-Key": ""
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    

    return this.http.get<Information>('https://api-football-v1.p.rapidapi.com/v2/teams/team/'.concat(String(id)) , requestOptions)
  }

  
}
