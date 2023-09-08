const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const content = document.getElementById('content')
const pokeDetail = document.getElementById('pokeDetail')
const detailTop = document.getElementById('detailTop')
const detailBot = document.getElementById('detailBot')

const maxRecords = 151
const limit = 20
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onclick="clickPokemon(${pokemon.number})">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

function convertPokemonTopToHtml(pokemon) {
    return `
        <div class="detailAll">
            <div class="detailLeft">
                <span class="nameDetail">${pokemon.name}</span>
                <ol class="typesDetail">
                    ${pokemon.types.map((type) => `<li class="typeDetail ${type}">${type}</li>`).join('')}
                </ol>
            </div>

            <span class="numberDetail">#${pokemon.number}</span>
            
        </div>
        
        <div class="imgPoke">
            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
    `
}

function convertPokemonBotToHtml(pokemon){
    return `
        <div class="abaut">
            <span class="menu">About</span>
            
            <div class="allList" style="color: #bfc2c5;">
                <ol class="listAbout">
                    <li>Height</li>
                    <li>Weight</li>
                    <li>Abilities</li>
                </ol>

                <ol class="listAbout" style="color: #969b9f; font-weight: bold;">
                    <li>${pokemon.height} cm</li>
                    <li>${pokemon.weight} kg</li>
                    <li>${pokemon.abilities.join(', ')}</li>
                </ol>
            </div>
        </div>
    `
}

function clickPokemon(pokemon_num){
    content.style.display = 'none'
    
    pokeDetail.style.display = 'block'
    pokeApi.getPokemon(pokemon_num).then((pokemon) => {
        detailTop.setAttribute('class', pokemon.type)
        const newHtmlTop = convertPokemonTopToHtml(pokemon);
        detailTop.innerHTML += newHtmlTop;

        const newHtlBot = convertPokemonBotToHtml(pokemon);
        detailBot.innerHTML += newHtlBot;
    })
}

function back(){
    window.location.reload(true)
}


loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})