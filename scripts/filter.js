export default class filter {

    /*construit un filtre pour trier la liste des recettes - 'classe mere' de appareil, ustensil, ingredient*/ 
    constructor(recipes, name) {
        this.name = name;
        this.recipeList = recipes;
        this.array = []; /* les éléments du filtres restants*/ 
        this.chosenFilterArray = []; /* les éléments du filtres selectionnés par l'utilisateur*/ 
        this.filterContainer = document.querySelector(`.${name}-filter-container`);
        this.input = ""; /*mot recherché dans l'input du filtre*/
    }

    /*affiche les éléments du filtre selectionnés sur la page*/
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

    /*affiche le filtre sur la page*/ 
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

    /*gere l'affichage dans le filtre lors d'un recherche*/ 
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

    /* écoute les évènements du bouton filtre*/
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

    /*gère l'affichage de la fermeture du menu filtre*/
    closeFilterButton() {
        this.filterContainer.querySelector(".normal").style.display = "inline-block";
        this.filterContainer.querySelector(".search").style.display = "none";
        this.filterContainer.querySelector(".filter-list").style.display = "none";

    }

   /* écoute les évènements des éléments du filtre, applique le tri, affiche l'element selectionné et ferme le menu lors de la selection d'un élément*/ 
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
                this.recipeList.closeAllFilters();
            })
        })
    }

    /* écoute les évènements des éléments selectionné du filtre, applique le tri, enlève l'affichage de l'element selectionné et ferme les menus lors de la selection d'un élément*/ 
    listenRemoveFilter() {
        let chosenFilterContainer = document.querySelector(".tag-container");
        let chosenFilterBtnList = chosenFilterContainer.querySelectorAll(`.chosen-${this.name}`);
        chosenFilterBtnList.forEach(elt => {
            elt.addEventListener("click", () => {
                this.chosenFilterArray = this.chosenFilterArray.filter(e => e !== elt.value);
                if (this.recipeList.searchedInput.length === 0)
                    this.recipeList.applyRecipesFilter(true);
                else this.recipeList.searchWithInput(this.recipeList.searchedInput);

                let chosenFilterContainer = document.querySelector(".tag-container");
                chosenFilterContainer.textContent = "";
                this.recipeList.filterList.forEach(filter => filter.renderChosenFilter());
                this.open = false;
                this.recipeList.closeAllFilters();
            })
        })
    }

}