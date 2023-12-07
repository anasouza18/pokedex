const listContentElement = document.querySelector('.list-content')
const listPokemons = []

function fetchPokemons() {
    fetch('https://pokeapi.co/api/v2/pokemon')
        .then(response => response.json())
        .then(data=> Promise.all(data.results.map((pokemon) =>
        fetch(pokemon.url) 
            .then(response => response.json())
            .then(data => ({
                name: data.name, 
                id: data.id,
                image: data.sprites.other.dream_world.front_default
            }))
    )))
        .then(pokemons => listPokemons.push(...pokemons))
        .finally(showPokemons)
}

function showPokemons() {
    console.log(listPokemons)
    listContentElement.innerHTML = listPokemons.map(pokemon =>(
        `
            <div class="card">
                <img class="card-image" src=${pokemon.image} alt="">
                <small class="card-id">${pokemon.id}</small>
                <strong class="card-name"> ${pokemon.name}</strong>
            </div>
        `
    )).join('')
}

fetchPokemons()
