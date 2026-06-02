import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

type MenuEntry = {
  link: string;
  name: string;
};

@Component({
  selector: 'app-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  protected readonly items: MenuEntry[] = [
    { link: "/", name: "INÍCIO" },
    { link: "/como-denunciar", name: "COMO DENUNCIAR" },
    { link: "/denuncie-aqui", name: "DENUNCIE AQUI" },
    { link: "/sobre-projeto", name: "SOBRE O PROJETO" },
    { link: "/areas-afetadas", name: "ÁREAS AFETADAS" },
  ];
}