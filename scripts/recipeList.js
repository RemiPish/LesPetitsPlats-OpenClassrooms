import recipe from "../scripts/recipe.js";
export default class recipeList {

    constructor(recipes) {
        this.allRecipes = recipes;
        this.filteredRecipes = [];
        this.filterList = [];
        this.applyRecipesFilter();
    }

    applyRecipesFilter() {

        let list = this.allRecipes;
        this.filterList.forEach(filter => {
            list = filter.filterRecipeList(list);
        })
        this.filteredRecipes = list;
        this.filterList.forEach(filter => {
            filter.collectFilter(this);
        })
        this.renderRecipeList();
    }

    renderRecipeList() {
        const recipeContainer = document.querySelector(".recipe-container");
        recipeContainer.textContent = "";
        this.filteredRecipes.forEach((elt) => {
            let recette = new recipe(elt);
            recipeContainer.appendChild(recette.render());
        })
    }

    searchRecipesInput() {
        let container = document.querySelector(".recipe-container");
        let input = document.querySelector(".recipe-input");
        input.addEventListener("keyup", () => {
            for (const elt of container.children) {
                console.log(elt)
                if (elt.id.toLowerCase().indexOf(input.value.toLowerCase()) > -1)
                    elt.style.display = ''
                else elt.style.display = 'none'
            }
        })
    }
}