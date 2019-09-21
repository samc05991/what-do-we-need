import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { EnvironmentConfig } from './services/environment-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthService, EnvironmentConfig]
})

export class AppComponent {
  title = 'what-do-we-need';
}
