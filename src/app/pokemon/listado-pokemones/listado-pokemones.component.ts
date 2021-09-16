import { Component, OnInit } from '@angular/core';
import { of, Subject } from 'rxjs';
import {  debounceTime, mergeMap  } from 'rxjs/operators';
import { Pokemon } from '../interfaces/pokemon.interface';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-listado-pokemones',
  templateUrl: './listado-pokemones.component.html',
  styleUrls: ['./listado-pokemones.component.css']
})
export class ListadoPokemonesComponent implements OnInit {

  pokemones : Pokemon[] = [];
  isFull: boolean = false;
  termino: string = '';
  filtrado : Pokemon[] = []
  subject$ = new Subject<string>();
  constructor(
    private pService: PokemonService
    ) { }

  ngOnInit(): void {
    
    this.pService.getListadoPokemones().subscribe( resp => this.llenarArreglo( resp )) ;

    this.subject$.pipe(
      debounceTime(300)
    ).subscribe( resp => this.filtrarPokemon( resp ) );
  }

  llenarArreglo( arrUrl: string[] ) {
    
     of(...arrUrl ).pipe(       
       mergeMap( urlPokemon => this.pService.getPokemonByUrl( urlPokemon ) )
     ).subscribe( pokemon => this.pokemones.push( pokemon ), err => null, () => {
        this.pokemones.sort( ( a, b) => a.id - b.id );
        this.filtrado = this.pokemones;
        this.isFull = true
      }  )

    
  }

  cargarImagen( pokemon: Pokemon ) {
    return pokemon.sprites.other?.['official-artwork'].front_default || 
          pokemon.sprites.front_default;
  } 

  buscar() {
      this.subject$.next( this.termino );
  }

  filtrarPokemon( pokemonSearch: string ) {
    this.pokemones = this.filtrado;
    if( pokemonSearch == '' ) {    
     return;
    }
    this.pokemones = this.pokemones.filter( pokemon => pokemon.name.includes( pokemonSearch.toLowerCase() ) );
  }
}
