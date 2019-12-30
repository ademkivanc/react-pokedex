import axios from 'axios';

const API_BASE_URL = 'https://pokeapi.co/api/v2/';
const IMG_PATH = 'https://assets.pokemon.com/assets/cms2/img/pokedex';

class PokeApiSerive {

    fetchPokeList() {
        return axios.get(API_BASE_URL + "pokemon/?offset=0&limit=1000");
    }

    getImage = (url) => {
        let paths = url.split("/");
        let id = paths[paths.length - 2];
        let imgUrl = IMG_PATH + '/detail/' + this.pad(id, 3) + '.png'
        return imgUrl
    }

    getBigImage = (id) => {
        let imgUrl = IMG_PATH + '/full/' + this.pad(id, 3) + '.png'
        return imgUrl
    }

    pad(num, size) {
        var s = "000000000" + num;
        return s.substr(s.length - size);
    }

    fetchPokemon(name) {
        return axios.get(API_BASE_URL + "pokemon/" + name + "/");
    }

    fetchPokemonMove(url) {
        return axios.get(url);
    }

    titleCase(str) {
        str = str.replace('-', ' ');
        let splitStr = str.toLowerCase().split(' ');
        for (let i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }

}

export default new PokeApiSerive();