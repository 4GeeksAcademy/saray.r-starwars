
const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		characters: [], 
		planets: [], 
		urlBase: "https://www.swapi.tech/api", 
		favorito: [], 
	  },
	  actions: {
		
		getCharacters: () => {
		  let store = getStore();

		  fetch(`${store.urlBase}/people`)
			.then((response) => response.json())
			.then((data) => {
			  for (let person of data.results) {
				
				fetch(`${store.urlBase}/people/${person.uid}`)
				  .then((response) => response.json())
				  .then((data) => {
					setStore({ characters: [...store.characters, data.result] });
				  });
			  }
			})
			.catch((error) => console.log(error));
		},
		
		getPlanets: async () => {
		  let store = getStore();
		  let response = await fetch(`${store.urlBase}/planets`);
		  let data = await response.json();
  
		  
		  for (let planet of data.results) {
			let response = await fetch(`${store.urlBase}/planets/${planet.uid}`);
			let data = await response.json();
			setStore({ planets: [...store.planets, data.result] });
		  }
		},
  
		// Acción para guardar un elemento en la lista de favoritos
		guardarFavoritos(nombre) {
		  const store = getStore();
		  const favoritos = store.favorito;
		  const newfavoritos = [...favoritos, { name: nombre, id: favoritos.length }];
		  setStore({ favorito: newfavoritos });
  
		  const actions = getActions();
		  const item = { name: nombre, id: favoritos.length };
  
		  if (favoritos.some(fav => fav.name === item.name)) {
			  const updatedFavoritos = favoritos.filter(fav => fav.name !== item.name);
			  setStore({ favorito: updatedFavoritos });
		  } else {
			  setStore({
				  favorito: [...favoritos, item]
			  });
		  }
		},
		
		
		eliminaFavorito(id){
		  const store = getStore();
		  const fav = store.favorito;
		  const favActualizado = fav.filter((item) => item.id !== id);
		  setStore({favorito: favActualizado})
		}
	  },
	};
  };
  
  export default getState;
  