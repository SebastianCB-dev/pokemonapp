import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { pluck, switchMap } from 'rxjs/operators';
import { Pokemon } from '../interfaces/pokemon.interface';
import { PokemonService } from '../services/pokemon.service';


@Component({
  selector: 'app-ver-pokemon',
  templateUrl: './ver-pokemon.component.html',
  styleUrls: ['./ver-pokemon.component.css']
})
export class VerPokemonComponent implements OnInit {
  hasError: boolean = false;
  search: string = '';
  pokemon!: Pokemon; 

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{
      ticks: {
        stepSize: 10,
        max: 160,
        min: 0
      }
    }] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;


  public barChartData: ChartDataSets[] = [
    { data: [], label: "Pokemon" },
  ];
  public barChartColors: Color[] = [
    { backgroundColor: '#3363AF', hoverBackgroundColor: '#FFCC01' },
  ]

  constructor(
    private activatedRoute: ActivatedRoute,
    private pService: PokemonService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      pluck('id'),
      switchMap( pokemon => {
        this.search = pokemon;
       return this.pService.getPokemonByName(pokemon)
      } )
    ).subscribe( resp => {
          resp.stats.forEach( stat => {
            this.barChartLabels.push( stat.stat.name );
            this.barChartData[0].data?.push(stat.base_stat)
          })
      
        return  this.pokemon = resp;
      },
    err => {
      this.hasError = true;
    } );


  }

  imagen() {
    return this.pokemon.sprites.other?.['official-artwork'].front_default || 
           this.pokemon.sprites.front_default;
  }


}
