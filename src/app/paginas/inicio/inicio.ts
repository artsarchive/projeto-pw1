import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Menu } from '../../a/menu/menu';
import { Feedback } from "../../a/feedback/feedback";

@Component({
  selector: 'app-inicio',
  imports: [RouterLink, Menu, Feedback],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {}
