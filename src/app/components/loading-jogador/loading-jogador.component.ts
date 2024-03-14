import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-jogador',
  templateUrl: './loading-jogador.component.html',
  styleUrls: ['./loading-jogador.component.scss'],
})
export class LoadingJogadorComponent  implements OnInit {
  dummy = Array(10);

  constructor() { }

  ngOnInit() {}

}
