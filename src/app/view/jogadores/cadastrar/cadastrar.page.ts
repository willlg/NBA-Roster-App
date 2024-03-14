import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/common/alert.service';
import { Posicao } from 'src/app/model/entities/Enum';
import Jogador from 'src/app/model/entities/Jogador';
import { AuthService } from 'src/app/model/services/auth.service';
import { FirebaseService } from 'src/app/model/services/firestore.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage  implements OnInit {
  public formCadastrarJ: FormGroup;

  public nome! :string;
  public idade! : number;
  public altura! : number;
  public peso! : number;
  public universidade! : string;
  public posicao! : Posicao;
  public imagem: any;
  public user: any;
  public isLoading: boolean = false;

  constructor(private alert: AlertService,
    private router : Router,
    private firebase: FirebaseService, private auth: AuthService, private formBuilder: FormBuilder,
    )  {
      this.user = this.auth.getUserLogged();
      this.formCadastrarJ = new FormGroup({
      nome: new FormControl(''),
      idade: new FormControl(''),
      altura: new FormControl(''),
      peso: new FormControl(''),
      universidade: new FormControl(''),
      posicao: new FormControl('')
      })
     }

  ngOnInit() {
    this.formCadastrarJ = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z]+$/)]],
      idade: ['', [Validators.required, Validators.min(16), Validators.max(42), Validators.pattern(/^[0-9]*$/)]],
      altura: ['', [Validators.required, Validators.min(170), Validators.max(240), Validators.pattern(/^[0-9]*$/)]],
      peso: ['', [Validators.required, Validators.min(70), Validators.max(200), Validators.pattern(/^[0-9]*$/)]],
      universidade: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z]+$/)]],
      posicao: ['', Validators.required]
    });
  }

  public uploadFile(imagem: any){
    this.imagem = imagem.files;
  }

  get errorControl() {
    return this.formCadastrarJ.controls;
  }

  submitForm(): boolean {
    this.isLoading = true;
    if (!this.formCadastrarJ.valid) {
      this.alert.presentAlert('Erro', 'Erro ao preencher o formulário');
      this.isLoading =false;
      return false;
    } else {
      this.cadastrar();
      this.isLoading =false;
      return true;
    }
  }


  cadastrar(){
    if(this.formCadastrarJ.valid){
       let novo : Jogador = new Jogador(this.formCadastrarJ.value['nome'], this.formCadastrarJ.value['idade'], this.formCadastrarJ.value['altura'], this.formCadastrarJ.value['peso'], this.formCadastrarJ.value['universidade'], this.formCadastrarJ.value['posicao']);
       novo.uid = this.user.uid;
       if (this.imagem) {
        this.firebase.uploadImage(this.imagem, novo);
        this.alert.presentAlert('Sucesso', 'Jogador salvo!');
        this.router.navigate(['/home']);
      } else {
        this.firebase
          .create(novo)
          .then(() => {
            this.alert.presentAlert('Sucesso', 'Jogador salvo!');
            this.router.navigate(['/home']);
          })
          .catch((error) => {
            console.error('Erro ao salvar o jogador', error);
          });
      }
    } else {
      this.alert.presentAlert(
        'Erro',
        'Preencha todos os campos obrigatórios corretamente!'
      );
    }
   }
   

}
