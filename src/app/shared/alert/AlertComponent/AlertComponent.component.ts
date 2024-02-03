import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './AlertComponent.component.html',
  styleUrls: ['./AlertComponent.component.css']
})
export class AlertComponentComponent implements OnInit {
  @Input() message: string = '';
  @Output() close = new EventEmitter<void>();
  constructor() { }

  onClose() {
    this.close.emit();
  }

  ngOnInit() {
  }

}
