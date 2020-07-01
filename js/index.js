var ApiPokemon
var imagemPokemon = {}

// Search
document.addEventListener('DOMContentLoaded', function() {
	axios.get('https://pokeapi.co/api/v2/pokemon?limit=807')
		.then(response => {
			ApiPokemon = response.data.results
			var exibePokemon = ApiPokemon[Math.floor(Math.random()*ApiPokemon.length)]
			ApiPokemon.forEach(poke=> {
				var split = poke.url.split('/')
				var numero = split[split.length-2]
				var url = 'https://pokeres.bastionbot.org/images/pokemon/'+numero+'.png'
				imagemPokemon[poke.name] = url
			})
			selecionarPokemon(exibePokemon.name)
		})
	var elems = document.querySelectorAll('.autocomplete')
	var instances = M.Autocomplete.init(elems, { data: imagemPokemon })
})

function apertaBotao() {
	var input = document.querySelector('#autocomplete-input')
	selecionarPokemon(input.value)
}

function selecionarPokemon(name) {
	axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`)
		.then(response => {
			var pokemon = response.data.name
			document.querySelector('#nomePokemon').innerHTML = pokemon.toUpperCase()
			var lista = document.querySelector('#listaHabilidades')
			var habilidades = response.data.abilities.map(ab => `<p>${ab.ability.name}</p>`)
			lista.innerHTML = habilidades.join('')
			var imagem = imagemPokemon[pokemon]
			document.querySelector('#pokeImage').src = imagem
			var tipos = response.data.types.map(t => t.type.name)
			document.querySelector('#listaTipos').innerHTML = tipos.join(', ')
			
		})
}
