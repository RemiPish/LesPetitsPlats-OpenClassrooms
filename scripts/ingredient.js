import filter from './filter.js';

export default class ingredient extends filter {
    constructor(recipes) {
        super(recipes, 'ingredient');
        this.collectFilter(recipes);
        this.input = document.querySelector(".ingredient-input");
    }
   
    collectFilter(recipes) {
        this.array = [];
        recipes.filteredRecipes.forEach(recipe => {
            recipe.ingredients.forEach(elt => {
                if (!this.array.find(e => e.toLowerCase() === elt.ingredient.toLowerCase()) && !this.chosenFilterArray.includes(elt.ingredient))
                    this.array.push(elt.ingredient)
            })
        })
    }
    filterRecipeList(recipes) {
        if(this.chosenFilterArray.length != 0){
            let r = [];
            recipes.filter(recipe => {
                let iArray = [];
                recipe.ingredients.forEach(ing => {
                    iArray.push(ing.ingredient)
                });
                if (this.chosenFilterArray.every(e => iArray.includes(e)))
                    r.push(recipe);
            });
            return r;
        }
        return recipes;
       
    }
}