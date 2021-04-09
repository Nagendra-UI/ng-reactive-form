import { formData } from './../data';
import { AfterViewInit, Component, ContentChild, Input, OnInit } from '@angular/core';
import { Data } from '@angular/router';

@Component({
  selector: 'app-view-values',
  templateUrl: './view-values.component.html',
  styleUrls: ['./view-values.component.css']
})
export class ViewValuesComponent implements OnInit {
  @Input() viewValues: formData;
  constructor() { }

  ngOnInit(): void {

  }


}
