import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JogadorComponent } from './jogador/jogador.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingJogadorComponent } from './loading-jogador/loading-jogador.component';
import { LoadingHomeComponent } from './loading-home/loading-home.component';




@NgModule({
  declarations: [JogadorComponent, UsuarioComponent, LoadingJogadorComponent, LoadingHomeComponent],
  imports: [
    CommonModule, IonicModule, ReactiveFormsModule],
  exports: [UsuarioComponent, JogadorComponent, LoadingJogadorComponent, LoadingHomeComponent]
})
export class ComponentsModule { }
