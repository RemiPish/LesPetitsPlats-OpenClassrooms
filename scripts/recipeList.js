import recipe from "../scripts/recipe.js";
export default class recipeList {

    /*construit la liste des recettes contenant les filtres pour permettre le tri lors des recherches*/
    constructor(recipes) {
        this.allRecipes = recipes;
        this.filteredRecipes = recipes;
        this.filterList = []; /* liste des filtres */
        this.applyRecipesFilter();
        this.searchedInput = ""; /*mot recherché dans la barre de recherche des recettes*/
    }

    /*applique et trie la liste des recettes selon les 3 filtres et affiche la liste des recettes résultante*/
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

    /* ferme le menu de tous les filtres*/ 
    closeAllFilters() {
        this.filterList.forEach(filter => filter.closeFilterButton());
    }

    /* affiche la liste des recettes résultante de la recherche*/
    renderRecipeList() {
        const recipeContainer = document.querySelector(".recipe-container");
        recipeContainer.textContent = "";
        this.filteredRecipes.forEach((elt) => {
            let recette = new recipe(elt);
            recipeContainer.appendChild(recette.render());
        })
    }

    /* affiche le message d'erreur quand il n'y a aucune recette correspondante de la recherche*/
    showEmptyRecipeContainer(text) {
        let container = document.querySelector(".recipe-container");
        container.textContent = "";
        let textDiv = document.createElement("div");
        textDiv.className += "no-result";
        textDiv.textContent = text;
        container.appendChild(textDiv);
    }

    /*écoute la barre d'input de recette*/
    listenRecipesInput() {
        let input = document.querySelector(".recipe-input");
        input.addEventListener("input", (e) => {
            this.filterList.forEach(filter => {
                filter.closeFilterButton();
            })
            this.searchWithInput(e.target.value);

        })
    }

    /* gere la recherche de la barre de l'input et lance le tri avec le mot recherché*/
    searchWithInput(inputValue) {
        if (inputValue.length < 3) {
            this.showEmptyRecipeContainer("Votre mot recherché doit être plus longue que 3 mots");
            return;
        }

        if (!inputValue.length) {
            this.filteredRecipes = this.allRecipes;
            this.searchedInput = "";
            this.searchRecipes(this.allRecipes);
            return;
        }
        this.searchedInput = inputValue.toLowerCase();
        this.searchRecipes(this.allRecipes);

    }

    /* cherche dans la liste des recettes avec le mot recherché */
    searchRecipes(list) {

        let res = this.searchUsingFilter(list);
        if (res.length > 0) {
            this.filteredRecipes = res;
            this.applyRecipesFilter();
        }
        else {
            this.filteredRecipes = this.allRecipes;
            this.showEmptyRecipeContainer("Aucune recette correspond à votre recherche!");
        }
    }

    /* cherche la recette selon le nom, la description, ou les ingredients avec le mot recherché*/
    searchUsingFilter(list) {
        return list.filter(recipe => {
            if ((recipe.name.toLowerCase().includes(this.searchedInput)) ||
                (recipe.description.toLowerCase().includes(this.searchedInput)) ||
                (recipe.ingredients.forEach(ing =>
                    ing.ingredient.toLowerCase().includes(this.searchedInput)))) return true;
        })
    }
}
