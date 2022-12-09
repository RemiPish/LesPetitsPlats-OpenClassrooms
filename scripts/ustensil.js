import filter from './filter.js';

export default class ustensil extends filter {
    constructor(recipes) {
        super(recipes, 'ustensil');
        this.collectFilter(recipes);
        this.input = document.querySelector(".ustensil-input");
    }
    collectFilter(recipes) {
        this.array = [];
        recipes.filteredRecipes.forEach(recipe => {
            recipe.ustensils.forEach(elt => {
                if (!this.array.find(e => e.toLowerCase() === elt.toLowerCase()) && !this.chosenFilterArray.includes(elt))
                    this.array.push(elt)
            })
        })
    }
    filterRecipeList(recipes) {
        if (this.chosenFilterArray.length != 0) {
            return recipes.filter(recipe => this.chosenFilterArray.every(e => recipe.ustensils.includes(e)));
        }
        return recipes;

    }
}