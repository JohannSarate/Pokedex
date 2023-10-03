const pokemonName = document.querySelector('.pokemon_name')
const pokemonID = document.querySelector('.pokemon_number')
const pokemonImage = document.querySelector('.pokemon_image')

const form = document.querySelector('.form')
const inputSearch = document.querySelector('.input_search')

const btnPrev = document.querySelector('.btn-prev')
const btnNext = document.querySelector('.btn-next')

let Searchpokemon = 1

const fetchPokemon = async (pokemon) => { // Definindo uma função como async, podemos utilizar a palavra-chave await antes de qualquer expressão que retorne uma promessa. Dessa forma, a execução da função externa (a função async) será pausada até que a Promise seja resolvida.
   
    /* O método global fetch() inicia o processo de busca 
     de um recurso da rede,
     retornando uma promessa que é cumprida assim 
     que a resposta estiver disponível. */

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`) //fetch e um funcao async, uma promise entao precisamos esperar a resposta dela, por isso usamos o await, fazendo asim a funcao continuar so apos a resposta do fetch

    if(APIResponse.status === 200) {
        const data = await APIResponse.json() //para termos acessos aos dados da API precisamos extrair os dados json da API // tb e uma funcao async

        return data
    }
    
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...'
    pokemonID.innerHTML = ''

    const data = await fetchPokemon(pokemon) //vamos usar a funcao fetchpokemon para pegar os dados em json

    if (data) {
        pokemonImage.style.display = 'block'
        pokemonName.innerHTML = data.name
        pokemonID.innerHTML = data.id
        //podemos acessar um elemento com . ou [], nesse caso vamos percorrer um caminho maior ate onde esta o gif do pokemon
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        inputSearch.value = ""
        Searchpokemon = data.id
    } else {
        pokemonImage.style.display = 'none'
        pokemonName.innerHTML = 'Not Found :c'
        pokemonID.innerHTML = ''
    }
    
}

form.addEventListener('submit', (event) => {

    event.preventDefault() //bloquando o evento padrao do form
    
    renderPokemon(inputSearch.value.toLowerCase())

})

btnPrev.addEventListener('click', () => {
    
    if (Searchpokemon > 1) {
        Searchpokemon -= 1
        renderPokemon(Searchpokemon)
    }
    
})

btnNext.addEventListener('click', ()=> {
    Searchpokemon += 1
    renderPokemon(Searchpokemon)
})

renderPokemon(Searchpokemon)

