import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentTheme = 'light-theme';

  changeTheme(theme: string): void {
    this.currentTheme = theme;
  }
}
