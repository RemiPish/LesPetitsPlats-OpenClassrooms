
import recipes from "../scripts/data/recipeData.js";

import ustensil from "../scripts/ustensil.js";
import ingredient from '../scripts/ingredient.js';
import appareil from '../scripts/appareil.js';
import recipeList from '../scripts/recipeList.js'

let recetteList = new recipeList(recipes);
recetteList.listenRecipesInput();

recetteList.renderRecipeList();

let ustensilFilter = new ustensil(recetteList);
recetteList.filterList.push(ustensilFilter);


let ingredientFilter = new ingredient(recetteList);
recetteList.filterList.push(ingredientFilter);

let appareilFilter = new appareil(recetteList);
recetteList.filterList.push(appareilFilter);

recetteList.filterList.forEach(filter => filter.listenFilterButton());


