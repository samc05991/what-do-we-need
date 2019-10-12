import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { EnvironmentConfig } from './services/environment-config.service';
import { ListService } from './services/list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthService, EnvironmentConfig, ListService]
})

export class AppComponent {
  title = 'what-do-we-need';
}
