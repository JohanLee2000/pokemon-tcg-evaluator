import pokemon from 'pokemontcgsdk';
import { POKEMON_API_KEY } from '@env';

pokemon.configure({ apiKey: POKEMON_API_KEY });

export default pokemon;