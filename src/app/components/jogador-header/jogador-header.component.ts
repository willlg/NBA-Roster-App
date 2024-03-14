import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-jogador-header',
  templateUrl: './jogador-header.component.html',
  styleUrls: ['./jogador-header.component.scss'],
})
export class JogadorHeaderComponent  implements OnInit {
  @Input() edicaao: boolean = false;

  constructor() { }

  ngOnInit() {}

}
