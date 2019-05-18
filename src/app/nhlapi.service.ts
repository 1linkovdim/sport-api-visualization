import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface Information {
  teams: any;
  api: any;
}

@Injectable({
  providedIn: 'root'
})

export class NhlapiService {

  constructor(private http: HttpClient) { }

  getTeamInformation() {
    return this.http.get<Information>('http://statsapi.web.nhl.com/api/v1/teams')
  }

  getplayerInformation(id: number) {
    const api_address1 = "https://api.nhle.com/stats/rest/skaters?isAggregate=false&reportType=basic&isGame=false&reportName=skatersummary&sort=[{\"property\":\"points\",\"direction\":\"DESC\"},{\"property\":\"goals\",\"direction\":\"DESC\"},{\"property\":\"assists\",\"direction\":\"DESC\"}]&cayenneExp=leagueId=133%20and%20gameTypeId=2%20and%20seasonId>=19171918%20and%20seasonId<=20182019"
    const api_address = 'http://statsapi.web.nhl.com/api/v1/people/'.concat(id.toString())

    return this.http.get<Information>(api_address)
  }
  
}
