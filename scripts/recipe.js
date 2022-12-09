export default class recipe {

    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.servings = data.servings;
        this.time = data.time;
        this.description = data.description;
        this.appliance = data.appliance;
        this.ingredients = data.ingredients;
        this.ustensils = data.ustensils;
    }

    render() {
        const article = document.createElement('article');
        article.setAttribute("id", this.name)

        const anchor = document.createElement('a');
        anchor.setAttribute("href", "#");
        anchor.className += "item-anchor";

        const divImg = document.createElement('div');
        divImg.className += "card-img";

        const divInfo = document.createElement('div');

        const cardHeader = document.createElement('div');
        cardHeader.className += "card-header"

        const cardTitle = document.createElement('div');
        cardTitle.textContent = this.name;
        cardTitle.className += "card-title";

        const cardTime = document.createElement('div');
        cardTime.className += "card-time-container"
        
        const cardTimeIcon = document.createElement('i');
        cardTimeIcon.className +="fa fa-clock-o";
        const cardTimeText = document.createElement('div');
        cardTimeText.textContent = `${this.time} min`
        cardTimeText.className += "card-time";

        const cardInfoContent = document.createElement('div');
        cardInfoContent.className += "card-infoContent"

        const ingredientList = document.createElement('ul');
        ingredientList.className += "ingredient-list"

        this.ingredients.forEach(elt => {
            const li = document.createElement('li');
            const name = document.createElement('spam');
            name.textContent = elt.ingredient + ": ";
            name.className += "card-ingredient-name"
            li.appendChild(name);

            const amount = document.createElement('spam');
            amount.textContent = elt.quantity + " ";
            li.appendChild(amount);

            if (!!elt.unit) {
                const unit = document.createElement('spam');
                unit.textContent = elt.unit;
                li.appendChild(unit);
            }
            ingredientList.appendChild(li)
        })

        const desc = document.createElement('div');
        desc.className += "description"
        desc.textContent = this.description;


        article.appendChild(anchor);
        anchor.appendChild(divImg);
        anchor.appendChild(divInfo);
        divInfo.appendChild(cardHeader);
        divInfo.appendChild(cardInfoContent);
        cardHeader.appendChild(cardTitle);
        cardHeader.appendChild(cardTime);
        cardTime.appendChild(cardTimeIcon);
        cardTime.appendChild(cardTimeText)
        cardInfoContent.appendChild(ingredientList);
        cardInfoContent.appendChild(desc);

        return (article);
    }
}