import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoPokemonesComponent } from './listado-pokemones/listado-pokemones.component';
import { ListadoComponent } from './listado-por-tipo/listado.component';
import { PorTipoComponent } from './por-tipo/por-tipo.component';
import { VerPokemonComponent } from './ver-pokemon/ver-pokemon.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'listado', component: ListadoPokemonesComponent },
      { path: 'por-tipo', component: PorTipoComponent},
      { path: 'por-tipo/:id:', component: ListadoComponent},
      { path: 'ver-pokemon/:id', component: VerPokemonComponent },
      { path: '**', redirectTo: 'listado' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokemonRoutingModule { }
