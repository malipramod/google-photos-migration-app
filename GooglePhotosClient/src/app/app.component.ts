import { Component, NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@NgModule({
  imports:[BrowserAnimationsModule]  
})
export class AppComponent {
  title = 'Google Photos ';
}
