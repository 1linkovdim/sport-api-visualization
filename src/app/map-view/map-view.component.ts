import { Component, OnInit, ViewChild } from '@angular/core';
import { NhlapiService } from '../nhlapi.service';
import { CitytocoordService } from '../citytocoord.service';
import { Globals } from '../global';
import { NBAApiService } from '../nba-api.service';
import { SoccerAPIService } from '../soccer-api.service'
import { } from 'googlemaps';
import {ActivatedRoute} from '@angular/router';





@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent{
  private map: google.maps.Map = null;

  all_teams;
  teams_location = [];

  current_player;
  player_cities = [];
  heatmap: google.maps.visualization.HeatmapLayer;
  pointArray;

  constructor(private service1: NhlapiService, private service2: CitytocoordService, 
              private service3: NBAApiService, private service4: SoccerAPIService,
              private globals: Globals, private route: ActivatedRoute) {}
  
  ngOnInit() {
    if(this.globals.sport.localeCompare("Hockey") == 0 && this.globals.visual.localeCompare("Teams") == 0){
      this.service1.getTeamInformation().subscribe(data1 =>{
        console.log(data1); 
        this.all_teams = data1;
        console.log(this.all_teams);
        for(var i = 0; i < this.all_teams.teams.length; i++) {
          console.log(this.all_teams.teams[i].abbreviation);
          this.service2.getLocation(this.all_teams.teams[i].venue.city).subscribe(data=>{
            console.log(data);
            this.teams_location.push({
            lat: (data.results[0].geometry.location.lat),
            lng: (data.results[0].geometry.location.lng),
            label: data.results[0].formatted_address
              });
            console.log(this.teams_location);
          });
        }
        //console.log(this.teams_location);
      })
    } else if(this.globals.sport.localeCompare("Hockey") == 0 && this.globals.visual.localeCompare("Players") == 0)
    {
        //this.service1.getplayerInformation(1).subscribe(data1 =>{
          // const length = (data1.data).length
          // for(var id = 0; id < length - 1; id++){
          //   const city = data1.data[id].playerBirthCity;
          //   var full_city : string;
          //   if(typeof city === 'string' || city instanceof String) {
          //     if(data1["data"][id].hasOwnProperty('playerBirthStateProvince')) {
          //       full_city = city.concat(", ".concat(data1.data[id].playerBirthStateProvince))
          //     } else {
          //       full_city = city.concat(", ".concat(data1.data[id].playerBirthCountry))
          //     }
          //     console.log(full_city)
          //     this.service2.getLocation(full_city).subscribe(data=>{
          //       //console.log(data);
          //       const lat = data.results[0].geometry.location.lat
          //       const lng = data.results[0].geometry.location.lng
          //       this.player_cities.push( 
          //         {lat: lat, lng: lng}
          //         );
          //       this.pointArray.push(
          //         new google.maps.LatLng(lat, lng)
          //       )
                //console.log(this.player_cities)
              for(var id = 8475706; id < 8481627; id++) {
                this.service1.getplayerInformation(id).subscribe(data1 =>{
                  console.log(data1);
                  this.current_player = data1;
                  const city = this.current_player.people[0].birthCity;
                  console.log(city);
                  var full_city : string;
                  if(typeof city === 'string' || city instanceof String) {
                    if(this.current_player.people[0].hasOwnProperty('birthStateProvince')) {
                      full_city = city.concat(", ".concat(this.current_player.people[0].birthStateProvince))
                    } else {
                      full_city = city.concat(", ".concat(this.current_player.people[0].birthCountry))
                    }
                    console.log(full_city)
                    this.service2.getLocation(full_city).subscribe(data=>{
                      //console.log(data);
                      const lat = data.results[0].geometry.location.lat
                      const lng = data.results[0].geometry.location.lng
                      this.player_cities.push( 
                        {lat: lat, lng: lng}
                        );
                      this.pointArray.push(
                        new google.maps.LatLng(lat, lng)
                      )
                      //console.log(this.player_cities)
                    })
                  }
                })
              }
              //})
    } else if(this.globals.sport.localeCompare("Basketball") == 0 && this.globals.visual.localeCompare("Teams") == 0)
      {
        this.service3.getTeamInformation().subscribe(data1 =>{
          console.log(data1);
          this.all_teams = data1;
          for(var i = 0; i < this.all_teams.data.length; i++) {
            const abbreviation = this.all_teams.data[i].abbreviation
            console.log(abbreviation);
            if (this.all_teams.data[i].city == "LA") {
              this.all_teams.data[i].city = "Los Angeles"
            }
            this.service2.getLocation(this.all_teams.data[i].city).subscribe(data=>{
              console.log(data);
              this.teams_location.push({
              lat: (data.results[0].geometry.location.lat),
              lng: (data.results[0].geometry.location.lng),
              label: abbreviation
                });
            });
          }
          //console.log(this.teams_location);
        })
      }else if(this.globals.sport.localeCompare("Basketball") == 0 && this.globals.visual.localeCompare("Players") == 0)
      {
        this.service3.getPlayerInformation().subscribe(data1 =>{
          console.log(data1);
          for(var i = 0; i < data1.cities.length; i++) {
            this.service2.getLocation(data1.cities[i]).subscribe(data=>{
              console.log(data);
              const lat = data.results[0].geometry.location.lat
              const lng = data.results[0].geometry.location.lng
              this.player_cities.push( 
                {lat: lat, lng: lng}
                );
              this.pointArray.push(
                new google.maps.LatLng(lat, lng)
              )
            });
          }
          //console.log(this.teams_location);
        })
      } else if(this.globals.sport.localeCompare("Soccer") == 0 && this.globals.visual.localeCompare("Teams") == 0)
      { for(var id = 0; id < 100; id++) {
        this.service4.getTeamInformation(id).subscribe(data1 =>{
          console.log(data1);
            const name = data1.api.results.teams[0].name
            console.log(name);
            this.service2.getLocation(data1.api.results.teams[0].venue_name).subscribe(data=>{
              console.log(data);
              this.teams_location.push({
              lat: (data.results[0].geometry.location.lat),
              lng: (data.results[0].geometry.location.lng),
              label: name
                });
              console.log(this.teams_location); 
            });
        })
      }
    }
  }


  onMapLoad(mapInstance: google.maps.Map) {
    this.map = mapInstance
    this.pointArray = new google.maps.MVCArray(this.pointArray)
    console.log("saved the map") 
    this.heatmap = new google.maps.visualization.HeatmapLayer({
      map: this.map,
      data: this.pointArray
    });
    console.log("initialized heatmap")
  }

}
