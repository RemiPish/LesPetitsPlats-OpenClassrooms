import filter from './filter.js';

export default class ustensil extends filter {
    constructor(recipes) {
        super(recipes, 'ustensil');
        this.recipeList.forEach(recipe => {
            recipe.ustensils.forEach(elt => {
                if (!this.array.find(e => e.toLowerCase() === elt.toLowerCase()))
                    this.array.push(elt)
            })
        })
        this.touchedFilterArray = this.array;
    }

    filterRecipeList() {
        let result = [];

        this.recipeList.forEach(recipe => {
            let filterListOnRecipe = [];
            let chosenFilterList = [];
            recipe.ustensils.forEach(elt => {
                filterListOnRecipe.push(elt.toLowerCase);
            })
            this.chosenFilterArray.forEach(elt => {
                chosenFilterList.push(elt.toLowerCase);
            })
            if(chosenFilterList.every(e => filterListOnRecipe.includes(e)))
            {
                result.push(recipe);
            }
            return result;
        })

    }


}