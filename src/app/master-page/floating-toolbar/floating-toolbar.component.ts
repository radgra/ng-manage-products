import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-floating-toolbar',
  templateUrl: './floating-toolbar.component.html',
  styleUrls: ['./floating-toolbar.component.scss']
})
export class FloatingToolbarComponent implements OnInit {
  @Output() onOrder = new EventEmitter()
  @Output() onRemove = new EventEmitter()

  constructor() { }

  ngOnInit(): void {

  }

}
