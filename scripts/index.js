
import recipes from "../scripts/data/recipeData.js";
import recipe from "../scripts/recipe.js";
import ustensil from "../scripts/ustensil.js";
import ingredient from '../scripts/ingredient.js';
import appareil from '../scripts/appareil.js';

let recipeList = recipes;
let recipeNameList = [];
let selectedRecipeNames = [];

/*recipeList.forEach(recipe => {
    recipeNameList.push(recipe.name)
})

function displayRecipe() {

    const input = document.querySelector(".recipe-input");

    input.addEventListener("keyup", () => {
        selectedRecipeNames = [];
        recipeNameList.forEach(elt => {
            if (elt.toLowerCase().indexOf(input.value.toLowerCase()) > -1) {
                selectedRecipeNames.push(elt);
            }
        })
        filterRecipe();
    })
}

function filterRecipe() {
   
    const input = document.querySelector(".recipe-input");
    recipeContainer.textContent = "";
    if (!input.value.trim().length) {
        recipeList.forEach((elt) => {

            let recette = new recipe(elt);
            recipeContainer.appendChild(recette.render());
        })
    }
    else {
        recipeList.forEach((elt) => {
            if (selectedRecipeNames.includes(elt.name)) {

                let recette = new recipe(elt);
                recipeContainer.appendChild(recette.render());


            }
        })
    }
}*/

const recipeContainer = document.querySelector(".recipe-container");
recipeList.forEach((elt) => {

    let recette = new recipe(elt);
    recipeContainer.appendChild(recette.render());
})

let ustensilFilter = new ustensil(recipeList);
ustensilFilter.listenFilterButton();

let ingredientFilter = new ingredient(recipeList);
ingredientFilter.listenFilterButton();

let appareilFilter = new appareil(recipeList);
appareilFilter.listenFilterButton();


