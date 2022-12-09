import filter from './filter.js';

export default class appareil extends filter {
    constructor(recipes) {
        super(recipes, 'appareil');
        this.collectFilter(recipes);
        this.input = document.querySelector(".appareil-input");
    }

    collectFilter(recipes) {
        this.array = [];
        recipes.filteredRecipes.forEach(recipe => {
            if (!this.array.find(e => e.toLowerCase() === recipe.appliance.toLowerCase()) && !this.chosenFilterArray.includes(recipe.appliance))
                this.array.push(recipe.appliance)
        })
    }
    filterRecipeList(recipes) {
        if(this.chosenFilterArray.length != 0){
            return recipes.filter(recipe => this.chosenFilterArray.includes(recipe.appliance));
        }
        return recipes;
        
    }
}
