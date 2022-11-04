export default class recipe {

    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.servings = data.servings;
        this.time = data.time;
        this.description = data.description;
        this.appliance = data.appliance;
        this.ingredients = [];
        this.ustensils = [];
        data.ingredients.forEach(elt => {
            this.ingredients.push(elt);
        });
        data.ustensils.forEach(elt => {
            this.ustensils.push(elt);
        });
    }

    render() {
        const article = document.createElement('article');

        const anchor = document.createElement('a');
        anchor.setAttribute("href", "#");

        const divImg = document.createElement('div');
        divImg.className += "card-img";

        const divInfo = document.createElement('div');

        const cardHeader = document.createElement('div');

        const cardTitle = document.createElement('div');
        cardTitle.textContent = this.name;

        const cardTime = document.createElement('div');

        const cardTimeIcon = document.createElement('i');
        const cardTimeText = document.createElement('div');
        cardTimeText.textContent = `${this.time} min`

        const cardInfoContent = document.createElement('div');

        const ingredientList = document.createElement('ul');

        this.ingredients.forEach(elt => {
            const li = document.createElement('li');
            const name = document.createElement('spam');
            name.textContent = elt.ingredient + ": ";

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