export default class filter {
    constructor(recipes, name) {
        this.name = name;
        this.recipeList = recipes;
        this.array = [];
        this.chosenFilterArray = [];
        this.filterContainer = document.querySelector(`.${name}-filter-container`);
        this.input = "";
    }

    renderChosenFilter() {
        let chosenFilterContainer = document.querySelector(".tag-container");

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
        let listDiv = this.filterContainer.querySelector(".filter-list");
        listDiv.style.display = "grid"
        listDiv.textContent = "";
        this.input.value = "";
        this.array.forEach(elt => {

            let itemAnchor = document.createElement('a');
            itemAnchor.className += "filter-item-anchor";
            itemAnchor.setAttribute("href", "#");
            itemAnchor.setAttribute("id", elt);
            itemAnchor.textContent = elt;

            listDiv.appendChild(itemAnchor);

        })

        this.listenFilterSelection();
    }

    searchInFilters() {
        let list = document.querySelectorAll(".filter-item-anchor");
        this.input.addEventListener("keyup", () => {
            list.forEach(elt => {
                if (elt.textContent.toLowerCase().indexOf(this.input.value.toLowerCase()) > -1)
                    elt.style.display = ''
                else elt.style.display = 'none'
            })
        })
    }

    listenFilterButton() {
        this.filterContainer.querySelector(".normal").addEventListener("click", () => {
            this.filterContainer.querySelector(".normal").style.display = "none";
            this.filterContainer.querySelector(".search").style.display = "flex";
            this.renderFilterArray();
            this.searchInFilters();

        });
        this.filterContainer.querySelector(".fa-chevron-up").addEventListener("click", () => {
            this.closeFilterButton();
        })

    }

    closeFilterButton() {
        this.filterContainer.querySelector(".normal").style.display = "inline-block";
        this.filterContainer.querySelector(".search").style.display = "none";
        this.filterContainer.querySelector(".filter-list").style.display = "none";

    }

    listenFilterSelection() {
        let listDiv = this.filterContainer.querySelector(".filter-list");
        let listAnchor = listDiv.querySelectorAll(".filter-item-anchor");
        listAnchor.forEach(itemAnchor => {
            itemAnchor.addEventListener("click", () => {
                this.chosenFilterArray.push(itemAnchor.id);
                let chosenFilterContainer = document.querySelector(".tag-container");
                chosenFilterContainer.textContent = "";
                this.recipeList.filterList.forEach(filter => filter.renderChosenFilter());
                this.recipeList.applyRecipesFilter();
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
                this.recipeList.applyRecipesFilter();

                let chosenFilterContainer = document.querySelector(".tag-container");
                chosenFilterContainer.textContent = "";
                this.recipeList.filterList.forEach(filter => filter.renderChosenFilter());
                this.open = false;
                this.filterContainer.querySelector(".normal").style.display = "inline-block";
                this.filterContainer.querySelector(".search").style.display = "none";
                this.filterContainer.querySelector(".filter-list").style.display = "none";
            })
        })
    }

}