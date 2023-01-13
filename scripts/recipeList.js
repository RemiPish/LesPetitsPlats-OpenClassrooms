import recipe from "../scripts/recipe.js";
export default class recipeList {

    constructor(recipes) {
        this.allRecipes = recipes;
        this.filteredRecipes = recipes;
        this.filterList = [];
        this.applyRecipesFilter();
        this.searchedInput = "";
    }

    applyRecipesFilter(isRemoved = false) {

        if (isRemoved) {
            this.filteredRecipes = this.allRecipes;
        }
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

    closeAllFilters() {
        this.filterList.forEach(filter => filter.closeFilterButton());
    }

    renderRecipeList() {
        const recipeContainer = document.querySelector(".recipe-container");
        recipeContainer.textContent = "";
        this.filteredRecipes.forEach((elt) => {
            let recette = new recipe(elt);
            recipeContainer.appendChild(recette.render());
        })
    }


    showEmptyRecipeContainer(text) {
        let container = document.querySelector(".recipe-container");
        container.textContent = "";
        let textDiv = document.createElement("div");
        textDiv.className += "no-result";
        textDiv.textContent = text;
        container.appendChild(textDiv);
    }

    listenRecipesInput() {
        let input = document.querySelector(".recipe-input");
        input.addEventListener("input", (e) => {
            this.filterList.forEach(filter => {
                filter.closeFilterButton();
            })
            this.searchWithInput(e.target.value);

        })
    }

    searchWithInput(inputValue) {
        if (!inputValue.length) {
            this.filteredRecipes = this.allRecipes;
            this.searchedInput = "";
            this.searchRecipes(this.allRecipes);
        }
        else if (inputValue.length < 3) {
            this.showEmptyRecipeContainer("Votre mot recherché doit être plus longue que 3 mots");
        }
        else {
            let previousInput = this.searchedInput;
            this.searchedInput = inputValue.toLowerCase();
            if ((previousInput.length < this.searchedInput.length) && (this.searchedInput.includes(previousInput))) {
                this.searchRecipes(this.filteredRecipes);
            }
            else this.searchRecipes(this.allRecipes);
        }
    }

    searchRecipes(list) {

        let res = this.searchUsingIteration(list);
        if (res.length > 0) {
            this.filteredRecipes = res;
            this.applyRecipesFilter();
        }
        else {
            this.filteredRecipes = this.allRecipes;
            this.showEmptyRecipeContainer("Aucune recette correspond à votre recherche!");
        }
    }


    searchUsingFilter(list) {
        return list.filter(recipe => {
            if ((recipe.name.toLowerCase().includes(this.searchedInput)) ||
                (recipe.description.toLowerCase().includes(this.searchedInput)) ||
                (recipe.ingredients.forEach(ing =>
                    ing.ingredient.toLowerCase().includes(this.searchedInput)))) return true;
        })
    }
}
