export default class filter {
    constructor(recipes, name) {
        this.name = name;
        this.recipeList = recipes;
        this.array = [];
        this.touchedFilterArray = [];
        this.chosenFilterArray = [];
        this.filterButton = document.querySelector(`.${name}-btn`);
        this.open = false;
    }

    renderChosenFilter() {
        let chosenFilterContainer = document.querySelector(".tag-container");
        chosenFilterContainer.textContent = "";

        this.chosenFilterArray.forEach(elt => {
            let chosenBtn = document.createElement('button');
            chosenBtn.className += `chosen-filter-btn chosen-${this.name}`;

            chosenBtn.setAttribute("value", elt)

            let chosenBtnTxt = document.createElement('div');
            chosenBtnTxt.textContent = elt;

            let chosenBtnIcon = document.createElement('i');
            chosenBtnIcon.className += "far fa-times-circle";

            chosenBtn.appendChild(chosenBtnTxt);
            chosenBtn.appendChild(chosenBtnIcon);
            chosenFilterContainer.appendChild(chosenBtn);
        })
        this.listenRemoveFilter();

    }

    renderFilterArray() {
        let listDiv = this.filterButton.querySelector(".filter-list");
        listDiv.style.display = "grid"
        listDiv.textContent = "";
        this.touchedFilterArray.forEach(elt => {

            let itemAnchor = document.createElement('a');
            itemAnchor.className += "filter-item-anchor";
            itemAnchor.setAttribute("href", "#");
            itemAnchor.setAttribute("id", elt);
            itemAnchor.textContent = elt;

            listDiv.appendChild(itemAnchor);

        })
        this.listenFilterSelection();
    }

    listenFilterButton() {
        this.filterButton.addEventListener("click", () => {
            if (this.open) {
                this.open = false;
                this.filterButton.querySelector(".normal").style.display = "flex";
                this.filterButton.querySelector(".search").style.display = "none";
                this.filterButton.querySelector(".filter-list").style.display = "none";

            }
            else {
                this.open = true;
                this.filterButton.querySelector(".normal").style.display = "none";
                this.filterButton.querySelector(".search").style.display = "flex";
                this.renderFilterArray();
            }
        });
    }

    listenFilterSelection() {
        let listDiv = this.filterButton.querySelector(".filter-list");
        let listAnchor = listDiv.querySelectorAll(".filter-item-anchor");
        listAnchor.forEach(itemAnchor => {
            itemAnchor.addEventListener("click", () => {
                this.chosenFilterArray.push(itemAnchor.id);
                this.renderChosenFilter();
                this.renderFilterArray();
            })
        })
    }

    listenRemoveFilter() {
        let chosenFilterContainer = document.querySelector(".tag-container");
        let chosenFilterBtnList = chosenFilterContainer.querySelectorAll(`.chosen-${this.name}`);
        chosenFilterBtnList.forEach(elt => {
            elt.addEventListener("click", () => {
                this.chosenFilterArray = this.chosenFilterArray.filter(e => e !== elt.value);
                this.renderChosenFilter();
            })
        })
    }

}