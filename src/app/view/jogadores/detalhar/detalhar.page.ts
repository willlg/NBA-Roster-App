import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/common/alert.service';
import { Posicao } from 'src/app/model/entities/Enum';
import Jogador from 'src/app/model/entities/Jogador';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/model/services/auth.service';
import { FirebaseService } from 'src/app/model/services/firestore.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {
  public formEditar: FormGroup;


  nome!: string;
  idade!: number;
  altura!: number;
  peso!: number;
  universidade!: string;
  posicao: string;
  jogador: Jogador;
  indice: number;
  edicao: boolean = true;
  imagem!: any;  
  user: any;

  constructor(
    private alert: AlertService,
    private router : Router,
    private firebase: FirebaseService, private alertController: AlertController, private auth: AuthService, private formBuilder: FormBuilder
  ) {
    this.user = this.auth.getUserLogged();
  }

  ngOnInit() {
    this.jogador = history.state.jogador;
    this.formEditar = this.formBuilder.group({
      nome: [this.jogador.nome, [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z]+$/)]],
      idade: [this.jogador.idade, [Validators.required, Validators.min(16), Validators.max(42), Validators.pattern(/^[0-9]*$/)]],
      altura: [this.jogador.altura, [Validators.required, Validators.min(170), Validators.max(240), Validators.pattern(/^[0-9]*$/)]],
      peso: [this.jogador.peso, [Validators.required, Validators.min(70), Validators.max(200), Validators.pattern(/^[0-9]*$/)]],
      universidade: [this.jogador.universidade, [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z]+$/)]],
      posicao: [this.jogador.posicao, Validators.required]
    });
  }
  
  uploadFile(imagem: any){
    this.imagem = imagem.files;
  }


  habilitar() {
    if (this.edicao) {
      this.edicao = false;
    } else {
      this.edicao = true;
    }
  }

  editar() {
    if (this.formEditar.valid) {
      let novo : Jogador = new Jogador(this.formEditar.value.nome, this.formEditar.value.idade, this.formEditar.value.altura, this.formEditar.value.peso, this.formEditar.value.universidade, this.formEditar.value.posicao);
      novo.id = this.jogador.id;
      novo.uid = this.user.uid;
      if (this.imagem) {
        this.firebase.uploadImage(this.imagem, novo);
        this.alert.presentAlert('Sucesso', 'Jogador alterado com sucesso!');
        this.router.navigate(['/home']);
      } else {
        this.firebase
          .update(novo, this.jogador.id)
          .then(() => {
            this.alert.presentAlert(
              'Sucesso',
              'Jogador alterado com sucesso!'
            );
            this.router.navigate(['/home']);
          })
          .catch((error) => {
            console.error('Erro ao atualizar o jogador', error);
          });
      }
    } else {
      this.alert.presentAlert(
        'Erro',
        'Preencha todos os campos obrigatórios corretamente!'
      );
    }
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


  excluir() {
    this.firebase.delete(this.jogador);
    this.router.navigate(['/home']);
  }
}
