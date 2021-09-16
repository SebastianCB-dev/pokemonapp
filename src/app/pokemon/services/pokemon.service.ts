import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { Pokemon, PokemonResp } from '../interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private pokemonApi: string = 'https://pokeapi.co/api/v2/'; 
  
  constructor(
    private http: HttpClient
  ) { }
 
  getListadoPokemones() {
  // 1118
     return this.http.get(`${ this.pokemonApi }pokemon?limit=1118`)
            .pipe(
             pluck('results'),
             map<PokemonResp[], string[]>( arr => {
               let listUrl: string[] = [];
               arr.forEach( element => {
                   listUrl.push(element.url);
               });
               return listUrl;
             })
        );
  }

  getPokemonByUrl( url: string ): Observable<Pokemon> {
    return  this.http.get<Pokemon>( url );
  }

  getPokemonByName( name: string ) {
    return this.http.get<Pokemon>( `${this.pokemonApi}pokemon/${name}` );
  }
// Retorna los tipos de pokemons
  getPokemonTypes(): Observable<PokemonResp[]> {
    return this.http.get<PokemonResp[]>(this.pokemonApi + 'type').pipe(      
      pluck('results')
    );
  }
// Retorna la lista de pokemons por un tipo
  getPokemonsByType( type: string ):Observable<PokemonResp[]> {
    return this.http.get<PokemonResp[]>(`${this.pokemonApi}type/${type}`).pipe(
      pluck('pokemon')
      
    )
  }
}
