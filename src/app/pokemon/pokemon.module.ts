import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { PokemonRoutingModule } from './pokemon-routing.module';
import { ListadoPokemonesComponent } from './listado-pokemones/listado-pokemones.component';
import { PorTipoComponent } from './por-tipo/por-tipo.component';
import { VerPokemonComponent } from './ver-pokemon/ver-pokemon.component';
import { ListadoComponent } from './listado-por-tipo/listado.component';



@NgModule({
  declarations: [
    ListadoPokemonesComponent,
    PorTipoComponent,
    VerPokemonComponent,
    ListadoComponent
  ],
  imports: [
    CommonModule,
    PokemonRoutingModule,
    FormsModule,
    ChartsModule
  ]
})
export class PokemonModule { }
