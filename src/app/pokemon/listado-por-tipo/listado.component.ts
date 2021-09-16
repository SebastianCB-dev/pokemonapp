import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay, mergeMap, pluck, switchMap, tap } from 'rxjs/operators';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon, PokemonResp } from '../interfaces/pokemon.interface';
import { of } from 'rxjs';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  isError: boolean = false;
  pokemonesUrls!: PokemonResp[];
  type: string = '';
  pokemones: Pokemon[] = [];
  isFull: boolean = false;
  constructor(
    private aRoute: ActivatedRoute,
    private pService: PokemonService
  ) { }

  ngOnInit(): void {

    this.aRoute.params.pipe(
      pluck('id:'),
      tap(id=> this.type = id),
      delay(2000),
      switchMap( id => this.pService.getPokemonsByType(id)),
    ).subscribe( pokemones => {
      this.pokemonesUrls = pokemones;
      this.llenarArreglo(pokemones);
    }, err => this.isError = true);
  }

   llenarArreglo( pokemones: any[] ) {
    of(...pokemones ).pipe(       
      mergeMap( pokemon => this.pService.getPokemonByUrl( pokemon.pokemon.url ) ),
    ).subscribe( pokemon => this.pokemones.push( pokemon ), err => null, () => {
      this.pokemones.sort( ( a, b) => a.id - b.id );
      this.isFull = true; 
   });
  }
  cargarImagen( pokemon: Pokemon ) {
    return pokemon.sprites.other?.['official-artwork'].front_default || 
          pokemon.sprites.front_default;
  } 
}

