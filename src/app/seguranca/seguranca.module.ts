import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormsModule } from '@angular/forms';
import { SegurancaRoutingModule } from './seguranca-routing.module';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    SegurancaRoutingModule,
    InputTextModule,
    ButtonModule
  ]
})
export class SegurancaModule { }
