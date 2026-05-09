import { Routes } from '@angular/router';
import { Inicio } from "./paginas/inicio/inicio";
import { ComoDenunciar } from "./paginas/como-denunciar/como-denunciar";
import { AreasAfetadas } from "./paginas/areas-afetadas/areas-afetadas";
import { DenuncieAqui } from "./paginas/denuncie-aqui/denuncie-aqui";
import { SobreProjeto } from "./paginas/sobre-projeto/sobre-projeto";

export const routes: Routes = [
  { path: "", component: Inicio },
  { path: "como-denunciar", component: ComoDenunciar },
  { path: "areas-afetadas", component: AreasAfetadas },
  { path: "denuncie-aqui", component: DenuncieAqui },
  { path: "sobre-projeto", component: SobreProjeto },
];
