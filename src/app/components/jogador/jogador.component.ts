import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from 'src/app/model/services/firestore.service';
import { AuthService } from 'src/app/model/services/auth.service';
import Jogador from 'src/app/model/entities/Jogador';

@Component({
 selector: 'app-jogador',
 templateUrl: './jogador.component.html',
 styleUrls: ['./jogador.component.scss'],
})
export class JogadorComponent implements OnInit {
 @Input() jogador: Jogador;
 @Input() edicao: boolean = false;
 public form: FormGroup;
 public user: any;
 public imagem: any;

 constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private firebase: FirebaseService,
    private auth: AuthService,
    private alertController: AlertController
 ) {
    this.user = this.auth.getUserLogged();
 }

 ngOnInit() {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z]+$/)]],
      idade: ['', [Validators.required, Validators.min(16), Validators.max(42), Validators.pattern(/^[0-9]*$/)]],
      altura: ['', [Validators.required, Validators.min(170), Validators.max(240), Validators.pattern(/^[0-9]*$/)]],
      peso: ['', [Validators.required, Validators.min(70), Validators.max(200), Validators.pattern(/^[0-9]*$/)]],
      universidade: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z]+$/)]],
      posicao: ['', Validators.required]
    });

    if (this.jogador) {
      this.form.patchValue(this.jogador);
    }
 }

 uploadFile(imagem: any) {
    this.imagem = imagem.files;
 }

 async confirmarEdicao() {
    const alert = await this.alertController.create({
      header: 'Confirmação',
      message: 'Você tem certeza que deseja editar este jogador?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.editar();
          },
        },
      ],
    });

    await alert.present();
 }

 async confirmarExclusao() {
    const alert = await this.alertController.create({
      header: 'Confirmação',
      message: 'Você tem certeza que deseja apagar este jogador?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.excluir();
          },
        },
      ],
    });

    await alert.present();
 }

 editar() {
    if (this.form.valid) {
      let novo: Jogador = new Jogador(this.form.value.nome, this.form.value.idade, this.form.value.altura, this.form.value.peso, this.form.value.universidade, this.form.value.posicao);
      novo.id = this.jogador.id;
      novo.uid = this.user.uid;
      if (this.imagem) {
        this.firebase.uploadImage(this.imagem, novo);
        this.router.navigate(['/home']);
      } else {
        this.firebase.update(novo, this.jogador.id).then(() => {
          this.router.navigate(['/home']);
        }).catch((error) => {
          console.error('Erro ao atualizar o jogador', error);
        });
      }
    } else {
      // Mostrar mensagem de erro
    }
 }

 excluir() {
    this.firebase.delete(this.jogador).then(() => {
      this.router.navigate(['/home']);
    }).catch((error) => {
      console.error('Erro ao excluir o jogador', error);
    });
 }
}
