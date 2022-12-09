export default class filter {
    constructor(recipes, name) {
        this.name = name;
        this.recipeList = recipes;
        this.array = [];
        this.chosenFilterArray = [];
        this.filterButton = document.querySelector(`.${name}-btn`);
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
        let listDiv = this.filterButton.querySelector(".filter-list");
        listDiv.style.display = "grid"
        listDiv.textContent = "";
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

        this.filterButton.querySelector(".fa-chevron-down").addEventListener("click", () => {
            this.filterButton.querySelector(".normal").style.display = "none";
            this.filterButton.querySelector(".search").style.display = "flex";
            this.renderFilterArray();
            this.searchInFilters();

        });
        this.filterButton.querySelector(".fa-chevron-up").addEventListener("click", () => {
            this.closeFilterButton();
        })

    }

    closeFilterButton() {


        this.filterButton.querySelector(".normal").style.display = "flex";
        this.filterButton.querySelector(".search").style.display = "none";
        this.filterButton.querySelector(".filter-list").style.display = "none";

    }

    listenFilterSelection() {
        let listDiv = this.filterButton.querySelector(".filter-list");
        let listAnchor = listDiv.querySelectorAll(".filter-item-anchor");
        listAnchor.forEach(itemAnchor => {
            itemAnchor.addEventListener("click", () => {
                this.chosenFilterArray.push(itemAnchor.id);
                let chosenFilterContainer = document.querySelector(".tag-container");
                chosenFilterContainer.textContent = "";
                this.recipeList.filterList.forEach(filter => filter.renderChosenFilter());
                this.recipeList.applyRecipesFilter();
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
                this.filterButton.querySelector(".normal").style.display = "flex";
                this.filterButton.querySelector(".search").style.display = "none";
                this.filterButton.querySelector(".filter-list").style.display = "none";
            })
        })
    }

}