import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Menu } from '../../a/menu/menu';

@Component({
  selector: 'app-como-denunciar',
  imports: [RouterLink, Menu],
  templateUrl: './como-denunciar.html',
  styleUrl: './como-denunciar.css',
})
export class ComoDenunciar {}
