
import recipes  from "../scripts/data/recipeData.js";
import recipe from "../scripts/recipe.js"

let recipeList = recipes;

const recipeContainer = document.querySelector(".recipe-container");

recipeList.forEach((elt) => {
    let recette = new recipe(elt);
    recipeContainer.appendChild(recette.render());
});
