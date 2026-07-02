import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  imports: [ReactiveFormsModule],
  templateUrl: './feedback.html',
  styleUrl: './feedback.css',
})
export class Feedback {
  form: FormGroup;
  formularioAberto = false;

  // ele usa o formato padrao [valorInicial, validadores]
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nome: [''],   // opcional
      email: [''],  // opcional
      tipo: ['', Validators.required],
      mensagem: ['', Validators.required]
    });
  }

  abrirFormulario() {
    this.formularioAberto = true;
  }

  fecharFormulario() {
    this.formularioAberto = false;
    this.form.reset();
  }

  enviar() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.fecharFormulario(); // Fecha e limpa após enviar
    } else {
      this.form.markAllAsTouched();
    }
  }
}
