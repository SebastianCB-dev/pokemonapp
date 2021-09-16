import { Component } from '@angular/core';

interface MenuItem {
  nombre: string,
  ruta: string
}


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  menu: MenuItem[] = [
    {
      nombre: 'Listado pokemones',
      ruta: 'home/listado'
    },
    {
      nombre: 'Por tipo',
      ruta: 'home/por-tipo'
    }

  ]  

}
