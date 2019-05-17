const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

fetch(TRAINERS_URL)
  .then(function(response){
    return response.json();
  })
  // RETURN VALUE IS AN OBJECT WITH MULTIPLE TRAINER INFORMATION
  .then(function(trainers){

    trainers.forEach(function(trainer){
      // CREATE TRAINER CARDS WITH RELATIVE ATTRIBUTES
      let pokemons = trainer.pokemons;
      const main = document.querySelector('main');
      const card = document.createElement('div');
      card.className = "card";
      card.dataId = trainer.id;

      const trainerName = document.createElement('p');
      trainerName.innerText = trainer.name;
      card.appendChild(trainerName);

      // ADD POKEMON BUTTON (event listener is below the helper function)
      const addPokemon = document.createElement('button');
      addPokemon.dataTrainerId = trainer.id;
      addPokemon.innerText = 'Add Pokemon';
      card.appendChild(addPokemon);

      const pokemonContainer = document.createElement('ul');
      card.appendChild(pokemonContainer);

      main.appendChild(card);

      ////////////////// HELPER FUNCTION TO GENERATE POKEMON ///////////////////

      const pk = function(poke){

        // ITERATE THROUGH POKEMONS AND CREATE NEW POKEMON
        const pokemon = document.createElement('li');
        pokemon.innerText = `${poke.nickname} (${poke.species})`;
        pokemon.id = poke.id;
        pokemonContainer.appendChild(pokemon);

        // RELEASE BUTTON
        const releaseBtn = document.createElement('button');
        releaseBtn.innerText = 'Release';
        releaseBtn.className = 'release';


        releaseBtn.addEventListener('click', function(){
          fetch(POKEMONS_URL + `${pokemon.id}`, {method: "DELETE"});
          releaseBtn.parentNode.remove();
        });
        pokemon.appendChild(releaseBtn);
      };
      ////////////////////////////////////////////////////////////////////////

      // ADD BUTTON EVENT LISTENER
      addPokemon.addEventListener('click', function(){
        fetch(POKEMONS_URL, {
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({"trainer_id": 1})
        })
        .then(function(response){
          return response.json();
        })
        .then(function(pokemon){
          pk(pokemon); // helper function
          console.log(pokemon);
        });
      });

      // INVOKE HELPER FUNCTION TO GENERATE EACH POKEMON
      pokemons.forEach(pk);

    });
  });
