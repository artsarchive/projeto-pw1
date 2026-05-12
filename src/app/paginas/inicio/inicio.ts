import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Menu } from '../../a/menu/menu';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink, Menu],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {}
