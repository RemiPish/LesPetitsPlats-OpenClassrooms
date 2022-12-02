import filter from './filter.js';

export default class ingredient extends filter {
    constructor(recipes) {
        super(recipes, 'ingredient');
        this.recipeList.forEach(recipe => {
            recipe.ingredients.forEach(elt => {
                if (!this.array.find(e => e.toLowerCase() === elt.ingredient.toLowerCase()))
                    this.array.push(elt.ingredient)
            })
        })
        this.touchedFilterArray = this.array;
    }
}