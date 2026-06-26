import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Menu } from '../../a/menu/menu';
import { Rodape } from '../../a/rodape/rodape';

@Component({
  selector: 'app-como-denunciar',
  imports: [RouterLink, Menu, Rodape],
  templateUrl: './como-denunciar.html',
  styleUrl: './como-denunciar.css',
})
export class ComoDenunciar {}
