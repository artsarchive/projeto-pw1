import { Component, computed, signal, AfterViewInit, inject, ElementRef, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { BaseMap, Menu, Rodape } from '../../a';

interface TipoViolencia {
  label: string;
  ativo: boolean;
}

@Component({
  selector: 'app-areas-afetadas',
  standalone: true,
  imports: [BaseMap, CommonModule, Menu, Rodape],
  templateUrl: './areas-afetadas.html',
  styleUrls: ['./areas-afetadas.css'],
})
export class AreasAfetadas implements AfterViewInit {
  private http = inject(HttpClient);
  private map = viewChild.required<BaseMap>('map');

  tiposViolencia: TipoViolencia[] = [
    { label: 'Física', ativo: true },
    { label: 'Psicológica', ativo: true },
    { label: 'Sexual', ativo: true },
    { label: 'Patrimonial', ativo: true },
    { label: 'Moral', ativo: true },
  ];

  periodos: string[] = [
    'Últimos 7 dias',
    'Últimos 30 dias',
    'Últimos 3 meses',
    'Último ano',
    'Todo o período',
  ];

  cidades: string[] = ['Ambas', 'Itabuna', 'Ilhéus'];
  periodoSelecionado = 'Últimos 3 meses';
  cidadeSelecionada = 'Ambas';

  preencherMapa(denuncias: any[]) {
    const map = this.map();
    map.clearMarkers();
    for (const d of denuncias) {
      const latlng = {lat: d.latitude, lng: d.longitude};
      map.addMarker(latlng);
    }
  }

  ngAfterViewInit() {
    this.http
      .get<any>('http://localhost:8080/denuncias/')
      .toPromise()
      .then((x) => this.preencherMapa(x))
      .catch((response: any) => {
        alert("Falha ao carregar as denúncias");
        console.error(response);
      });

    // TODO: preencher o mapa
  }

  get subtituloMapa(): string {
    const local = this.cidadeSelecionada === 'Ambas' ? 'Itabuna e Ilhéus' : this.cidadeSelecionada;
    return `${local} — nenhuma denúncia registrada ainda`;
  }

  toggleTipo(tipo: TipoViolencia): void {
    tipo.ativo = !tipo.ativo;
  }

  selecionarPeriodo(periodo: string): void {
    this.periodoSelecionado = periodo;
  }

  selecionarCidade(cidade: string): void {
    this.cidadeSelecionada = cidade;
  }

  aplicarFiltros(): void {
    const tiposAtivos = this.tiposViolencia.filter((t) => t.ativo).map((t) => t.label);

    // falta chamar o service passando os filtros pra api
    console.log('Filtros aplicados:', {
      tipos: tiposAtivos,
      periodo: this.periodoSelecionado,
      cidade: this.cidadeSelecionada,
    });
  }
}
