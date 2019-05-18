import { Component, OnInit } from '@angular/core';
import { Globals } from '../global';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms'
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-sport-selection',
  templateUrl: './sport-selection.component.html',
  styleUrls: ['./sport-selection.component.css']
})
export class SportSelectionComponent {
  selectionForm;
  constructor(private globals: Globals, private formBuilder: FormBuilder, private route: ActivatedRoute) {
    this.selectionForm = new FormGroup({
      sport: new FormControl(),
      visual: new FormControl()
    });
   }
  sport: string;
  sports = ['Hockey', 'Soccer', 'Basketball'];
  visuals = ['Teams', 'Players'];
  visual: string;



  onSubmit() {
    this.globals.submitted = true;
    this.globals.sport = this.sport;
    this.globals.visual = this.visual;
    console.log(this.globals.sport)
    console.log(this.globals.visual)
  }

  

}
