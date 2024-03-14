import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario-header',
  templateUrl: './usuario-header.component.html',
  styleUrls: ['./usuario-header.component.scss'],
})
export class UsuarioHeaderComponent  implements OnInit {
  @Input() cadastroo: boolean = false;

  constructor() { }

  ngOnInit() {}

}
