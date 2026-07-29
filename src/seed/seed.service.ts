import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
//import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { AxiosAdapter } from '../common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  //private readonly axios: AxiosInstance = axios;

  constructor(
  
      @InjectModel( Pokemon.name )
      private readonly pokemonModel: Model<Pokemon>,
      private readonly http: AxiosAdapter,

    ){}
  
  async executeSeed() {   
    
    await this.pokemonModel.deleteMany({});
    
    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650'); 
    
    // Forma 01 - insertar
    // const insertPromisesArray: Promise<Pokemon>[] = [];

    // data.results.forEach( ({ name, url }) => {
    //   const segments = url.split('/');
    //   //console.log(segments);
    //   const no = +segments[ segments.length - 2 ];

    //   //const pokemon = await this.pokemonModel.create( { name, no } ); 
    //   insertPromisesArray.push( 
    //     this.pokemonModel.create({ name, no }) 
    //   ); 
    //   //console.log({ name, no });
    // } );

    // await Promise.all( insertPromisesArray );

    // Forma 02 - insertar
    const pokemonToInsert: { name: string, no: number }[] = [];

    data.results.forEach( ({ name, url }) => {

      const segments = url.split('/');  
      const no = +segments[ segments.length - 2 ];
      pokemonToInsert.push({ name, no });

    });

    await this.pokemonModel.insertMany( pokemonToInsert );

    return 'Seed executed';
  }
}
