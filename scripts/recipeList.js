import recipe from "./Recipe.js";

export default class recipeList {

    constructor(recipes) {
        this.allRecipes = recipes;
        this.filteredRecipes = [];
        this.filterList = [];
    }

    applyFilter() {
        this.filterList.forEach(filter => {
            let l = filter.filterRecipeList();
            l.forEach(rec => {
                if(this.filteredRecipes.includes(rec))
                {
                    this.filteredRecipes.push(rec);
                }
            })
        })

        
    }

}