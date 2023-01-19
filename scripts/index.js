
import recipes from "../scripts/data/recipeData.js";

import ustensil from "../scripts/ustensil.js";
import ingredient from '../scripts/ingredient.js';
import appareil from '../scripts/appareil.js';
import recipeList from '../scripts/recipeList.js'

let recetteList = new recipeList(recipes);
/*écoute la barre de recherche de recette*/
recetteList.listenRecipesInput();

/*affiche la liste des recettes*/
recetteList.renderRecipeList();

/*ajout des trois filtres*/
let ustensilFilter = new ustensil(recetteList);
recetteList.filterList.push(ustensilFilter);


let ingredientFilter = new ingredient(recetteList);
recetteList.filterList.push(ingredientFilter);

let appareilFilter = new appareil(recetteList);
recetteList.filterList.push(appareilFilter);

/*écoute les filtres*/
recetteList.filterList.forEach(filter => filter.listenFilterButton());


