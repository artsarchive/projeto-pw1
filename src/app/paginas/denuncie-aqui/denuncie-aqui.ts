import {
  Component,
  signal,
  EventEmitter,
  Output,
  viewChild,
  AfterViewInit,
  inject,
} from '@angular/core';
import { KeyValuePipe, JsonPipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { LatLng } from 'leaflet';

import { ReverseGeocodedMap } from '../../a/mapa';
import { Menu } from '../../a/menu/menu';
import { Rodape } from '../../a/rodape/rodape';

export class Submissao {
  constructor(
    public tipoViolencia: string = 'agressao',
    public dataOcorrencia: string = '',
    public horarioOcorrencia: string = 'tarde',
    public pontoReferencia: string = '',
    public nomeLocal: string = '',
    public latitude: number | null = null,
    public longitude: number | null = null,
  ) {}
}

function normalizeDate(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0);
}

function dateOffset(d: Date, off: number): Date {
  const c = new Date(d);
  c.setDate(c.getDate() + off);
  return c;
}

function isValidDate(got_: Date): boolean {
  // FIXME: de madrugada pode dar errado. algo com timezones

  const now = normalizeDate(new Date());
  const got = normalizeDate(got_);

  if (got < dateOffset(now, -7)) return false;
  if (got > now) return false;
  return true;
}

@Component({
  selector: 'app-denuncie-aqui',
  imports: [ReverseGeocodedMap, Menu, FormsModule, KeyValuePipe, Rodape],
  templateUrl: './denuncie-aqui.html',
  styleUrl: './denuncie-aqui.css',
})
export class DenuncieAqui {
  private form = viewChild.required<NgForm>("myForm");
  private http = inject(HttpClient);

  readonly tiposViolencia: Record<string, string> = {
    trafico: 'Tráfico',
    sexual: 'Sexual',
    feminicidio: 'Feminicídio',
    agressao: 'Agressão',
    psicologica: 'Psicológica',
    exploração: 'Exploração',
    machismo: 'Machismo',
    assalto: 'Assalto',
    insulto: 'Insulto',
    desrespeito: 'Desrespeito',
    injustica: 'Injustiça',
    indiferença: 'Indiferença',
  };

  readonly horariosOcorrencia: Record<string, string> = {
    madrugada: 'Madrugada (00:00 - 04:59)',
    manha: 'Manhã (05:00 - 12:59)',
    tarde: 'Tarde (13:00 - 17:59)',
    noite: 'Noite (18:00 - 23:59)',
  };

  model = new Submissao();

  displayCoords(): string {
    if (this.model.latitude === null || this.model.longitude === null) {
      return '';
    }
    return `${this.model.latitude}, ${this.model.longitude}`;
  }

  getFormError(): null | string {
    if (this.model.dataOcorrencia == '') return 'Data inválida';

    const dataOcorrencia = new Date(this.model.dataOcorrencia);
    if (!isValidDate(dataOcorrencia)) return 'A data deve estar entre hoje e 7 dias atrás';

    if (this.tiposViolencia[this.model.tipoViolencia] == undefined)
      return 'Tipo de violência inválido';

    if (this.horariosOcorrencia[this.model.horarioOcorrencia] == undefined)
      return 'Horário de ocorrência inválido';

    if (this.model.nomeLocal == '' && (this.model.latitude == null || this.model.longitude == null))
      return 'Nenhum local foi especificado';

    return null;
  }

  onSubmit(ev: Event) {
    const err = this.getFormError();
    if (err != null) {
      alert(`Falha ao enviar: ${err}`);
      return;
    }

    this.http
      .post<any>('http://localhost:8080/denuncias/', this.model)
      .toPromise()
      .then((response: any) => {
        alert("Denúncia cadastada com sucesso!");
        this.form().resetForm();
        console.log({sucess: response});
      })
      .catch((response: any) => {
        alert("Falha ao enviar: erro interno.");
        console.log({failure: response});
      });
  }

  receberLocal(local: LatLng) {
    this.model.latitude = local.lat;
    this.model.longitude = local.lng;
    this.model.nomeLocal = '(Carregando...)';
  }

  carregarNomeLocal(nome: string) {
    this.model.nomeLocal = nome;
  }
}
