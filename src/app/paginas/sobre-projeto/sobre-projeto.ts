import { Component } from '@angular/core';
import { Menu } from '../../a/menu/menu';
import { Rodape } from '../../a/rodape/rodape';

@Component({
  selector: 'app-sobre-projeto',
  imports: [Menu, Rodape],
  templateUrl: './sobre-projeto.html',
  styleUrl: './sobre-projeto.css',
})
export class SobreProjeto {}
