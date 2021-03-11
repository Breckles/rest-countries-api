import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output()
  onThemeChange = new EventEmitter<string>();

  currentTheme = 'dark-theme';

  constructor() {}

  ngOnInit(): void {}

  toggleTheme(): void {
    if (this.currentTheme === 'dark-theme') {
      this.currentTheme = 'light-theme';
    } else {
      this.currentTheme = 'dark-theme';
    }

    this.onThemeChange.emit(this.currentTheme);
  }
}
