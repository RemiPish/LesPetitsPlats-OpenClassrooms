import filter from  './filter.js';

export default class appareil extends filter {
    constructor(recipes)
    {
        super(recipes, 'appareil');
        this.recipeList.forEach(recipe => {
            if (!this.array.find(e => e.toLowerCase() === recipe.appliance.toLowerCase())) {
                this.array.push(recipe.appliance)
            }
        })
        this.touchedFilterArray = this.array;
    }
}