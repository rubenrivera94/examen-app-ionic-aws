import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {

  pages = [
    { title: 'Scan', url: '/scan', icon: 'scan-outline' },
    { title: 'Historial', url: '/historial', icon: 'time-outline' },
    { title: 'Nuevo Cliente', url: '/aws', icon: 'person-add-outline' },
    { title: 'Home', url: '/pantalla-principal', icon: 'home-outline' },
   
  ]
  constructor() { }

  ngOnInit() {}

}
