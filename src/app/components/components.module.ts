import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JogadorComponent } from './jogador/jogador.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [JogadorComponent, UsuarioComponent],
  imports: [
    CommonModule, IonicModule, ReactiveFormsModule],
  exports: [UsuarioComponent, JogadorComponent]
})
export class ComponentsModule { }
