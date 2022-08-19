import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-settings-select',
  styleUrls: ['./settings-select.component.scss'],
  templateUrl: './settings-select.component.html',
})
export class SettingsSelectComponent implements OnInit {
  @Input()
  name = '';
  @Input()
  heading = '';
  @Input()
  description = '';
  @Input()
  option = {};
  @Input()
  avaiableOptions: string[] = [];
  @Output()
  changeVal = new EventEmitter<{ name: string; value: string }>();

  constructor() {}

  ngOnInit(): void {}

  onChangeVal(name: string, value: string) {
    this.changeVal.emit({ name: name, value: value });
  }
}
