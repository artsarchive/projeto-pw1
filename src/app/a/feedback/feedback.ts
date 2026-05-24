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

  // ele usa o formato padrao [valorInicial, validadores]
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nome: [''],   // opcional
      email: [''],  // opcional
      tipo: ['', Validators.required],
      mensagem: ['', Validators.required]
    });
  }

  enviar() {
    console.log('form válido?', this.form.valid);
    console.log('valores:', this.form.value);
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
