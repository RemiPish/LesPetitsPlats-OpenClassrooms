import filter from './filter.js';

/*construit la liste des ustensiles (à filtrer) qui fait partie du filtre*/
export default class ustensil extends filter {
    constructor(recipes) {
        super(recipes, 'ustensil');
        this.collectFilter(recipes);
        this.input = document.querySelector(".ustensil-input");
    }

    /* trie la liste des ustensiles valides restants à appliquer*/
    collectFilter(recipes) {
        this.array = [];
        recipes.filteredRecipes.forEach(recipe => {
            recipe.ustensils.forEach(elt => {
                if (!this.array.find(e => e.toLowerCase() === elt.toLowerCase()) && !this.chosenFilterArray.includes(elt))
                    this.array.push(elt)
            })
        })
    }

    /*filtrer la liste des recettes selon la liste des ustensiles choisie*/
    filterRecipeList(recipes) {
        if (this.chosenFilterArray.length != 0) {
            return recipes.filter(recipe => this.chosenFilterArray.every(e => recipe.ustensils.includes(e)));
        }
        return recipes;

    }
}