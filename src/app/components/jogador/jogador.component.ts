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
 @Input() form: FormGroup;

 constructor() {}

 ngOnInit() {}
}
