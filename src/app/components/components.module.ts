import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JogadorComponent } from './jogador/jogador.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingJogadorComponent } from './loading-jogador/loading-jogador.component';
import { LoadingHomeComponent } from './loading-home/loading-home.component';
import { JogadorHeaderComponent } from './jogador-header/jogador-header.component';
import { UsuarioHeaderComponent } from './usuario-header/usuario-header.component';




@NgModule({
  declarations: [JogadorComponent, UsuarioComponent, LoadingJogadorComponent, LoadingHomeComponent, JogadorHeaderComponent,UsuarioHeaderComponent],
  imports: [
    CommonModule, IonicModule, ReactiveFormsModule],
  exports: [UsuarioComponent, JogadorComponent, LoadingJogadorComponent, LoadingHomeComponent, JogadorHeaderComponent, UsuarioHeaderComponent]
})
export class ComponentsModule { }
