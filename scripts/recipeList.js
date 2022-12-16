import recipe from "../scripts/recipe.js";
export default class recipeList {

    constructor(recipes) {
        this.allRecipes = recipes;
        this.filteredRecipes = recipes;
        this.filterList = [];
        this.applyRecipesFilter();
        this.searchedInput = "";
    }

    applyRecipesFilter() {

        let list = this.filteredRecipes;
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

    showEmptyRecipeContainer() {
        let container = document.querySelector(".recipe-container");
        container.textContent = "";
        let textDiv = document.createElement("div");
        textDiv.className += "no-result";
        textDiv.textContent = "Aucune recette correspond à votre recherche!";
        container.appendChild(textDiv);
    }

    listenRecipesInput() {
        let input = document.querySelector(".recipe-input");
        input.addEventListener("input", (e) => {
            let inputValue = e.target.value;
            if(!inputValue.length)
            {
                this.filteredRecipes = this.allRecipes;
                this.renderRecipeList();
            }
            else if (inputValue.length <= 3) {
                this.showEmptyRecipeContainer();
            }
            else {
                let previousInput = this.searchedInput;
                this.searchedInput = inputValue.toLowerCase();
                if ((previousInput.length < this.searchedInput.length) && (this.searchedInput.includes(previousInput))) {
                    this.searchRecipes(this.filteredRecipes);
                }
                else this.searchRecipes(this.allRecipes);
            }
        })
    }

    searchRecipes(list) {

        let res = list.filter(recipe => {
            if ((recipe.name.toLowerCase().includes(this.searchedInput)) ||
                (recipe.description.toLowerCase().includes(this.searchedInput)) ||
                (recipe.ingredients.forEach(ing =>
                    ing.ingredient.toLowerCase().includes(this.searchedInput)))) return true;
        })
        
        if (res.length > 0) {
            this.filteredRecipes = res;
            this.filterList.forEach(filter => {
                filter.collectFilter(this);
            });
            this.renderRecipeList();
        }
        else {
            this.filteredRecipes = this.allRecipes;
            this.showEmptyRecipeContainer();
        }

    }

}