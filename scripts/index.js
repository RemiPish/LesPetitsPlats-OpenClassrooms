
import recipes from "../scripts/data/recipeData.js";
import recipe from "../scripts/recipe.js"
import { ingredientList, appareilList, ustensilsList, initialiseFilterList, chosenIngredientList, chosenAppareilList } from "./filter.js";
let recipeList = recipes;
let recipeNameList = [];
let selectedRecipeNames = [];

recipeList.forEach(recipe => {
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
    const recipeContainer = document.querySelector(".recipe-container");
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
}


initialiseFilterList(recipeList);
displayRecipe();
filterRecipe();

