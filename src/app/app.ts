import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Menu } from './a/menu/menu';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, Menu],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('projeto-pw');
}
