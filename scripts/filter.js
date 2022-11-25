export let ingredientList = [];
export let appareilList = [];
export let ustensilsList = [];

export let chosenIngredientList = [];
export let chosenAppareilList = [];
export let chosenUstensilsList = [];

let ingredientBtn = document.querySelector(".ingredient-btn");
let appareilBtn = document.querySelector(".appareil-btn");
let ustensilBtn = document.querySelector(".ustensil-btn");

let ingredientFilterOpen = false;
let appareilFilterOpen = false;
let ustensilFilterOpen = false;

showChosenFilter();

ustensilBtn.addEventListener("click", () => {
    if (ustensilFilterOpen) {
        ustensilFilterOpen = false;
        ustensilBtn.querySelector(".normal").style.display = "flex";
        ustensilBtn.querySelector(".search").style.display = "none";
        ustensilBtn.querySelector(".filter-list").style.display = "none";

    }
    else {
        ustensilFilterOpen = true;
        ustensilBtn.querySelector(".normal").style.display = "none";
        ustensilBtn.querySelector(".search").style.display = "flex";
        displayList("ustensiles", ustensilsList);
        searchInFilters("ustensiles");
    }
});

appareilBtn.addEventListener("click", () => {
    if (appareilFilterOpen) {
        appareilFilterOpen = false;
        appareilBtn.querySelector(".normal").style.display = "flex";
        appareilBtn.querySelector(".search").style.display = "none";
        appareilBtn.querySelector(".filter-list").style.display = "none";

    }
    else {
        appareilFilterOpen = true;
        appareilBtn.querySelector(".normal").style.display = "none";
        appareilBtn.querySelector(".search").style.display = "flex";
        displayList("appareils", appareilList);
        searchInFilters("appareils");

    }
});

ingredientBtn.addEventListener("click", () => {
    if (ingredientFilterOpen) {
        ingredientFilterOpen = false;
        ingredientBtn.querySelector(".normal").style.display = "flex";
        ingredientBtn.querySelector(".search").style.display = "none";
        ingredientBtn.querySelector(".filter-list").style.display = "none";

    }
    else {
        ingredientFilterOpen = true;
        ingredientBtn.querySelector(".normal").style.display = "none";
        ingredientBtn.querySelector(".search").style.display = "flex";
        displayList("ingredients", ingredientList);
        searchInFilters("ingredients");
    }
});

export function initialiseFilterList(recipeList) {
    recipeList.forEach(recipe => {
        recipe.ingredients.forEach(elt => {
            if (!ingredientList.find(e => e.toLowerCase() === elt.ingredient.toLowerCase()))
                ingredientList.push(elt.ingredient)
        })
    })

    recipeList.forEach(recipe => {
        if (!appareilList.find(e => e.toLowerCase() === recipe.appliance.toLowerCase())) {
            appareilList.push(recipe.appliance)
        }

    })

    recipeList.forEach(recipe => {
        recipe.ustensils.forEach(elt => {
            if (!ustensilsList.find(e => e.toLowerCase() === elt.toLowerCase()))
                ustensilsList.push(elt)
        })
    })
}

function searchInFilters(name) {
    let input;
    let list = document.querySelectorAll(".filter-item-btn");
    switch (name) {
        case "ustensiles":
            input = document.querySelector(".ustensil-input");
            break;
        case "appareils":
            input = document.querySelector(".appareil-input");
            break;
        case "ingredients":
            input = document.querySelector(".ingredient-input");
            break;
        default:
            break;
    }
    input.addEventListener("keyup", () => {

        list.forEach(elt => {
            if (elt.textContent.toLowerCase().indexOf(input.value.toLowerCase()) > -1)
                elt.style.display = ''
            else elt.style.display = 'none'
        })
    })
}

function displayList(name, list) {



    let listDiv;
    let chosenList;
    switch (name) {
        case "ustensiles":
            listDiv = ustensilBtn.querySelector(".filter-list");
            chosenList = chosenUstensilsList
            break;
        case "appareils":
            listDiv = appareilBtn.querySelector(".filter-list");
            chosenList = chosenAppareilList;
            break;
        case "ingredients":
            listDiv = ingredientBtn.querySelector(".filter-list");
            chosenList = chosenIngredientList;
            break;
        default:
            break;
    }
    listDiv.style.display = "grid"
    listDiv.textContent = "";
    list.forEach(elt => {
        if (!chosenList.includes(elt)) {
            let itemBtn = document.createElement('button');
            itemBtn.className += "filter-item-btn";
            itemBtn.setAttribute("value", elt);
            itemBtn.textContent = elt;
            itemBtn.addEventListener("click", () => {
                switch (name) {
                    case "ustensiles":
                        chosenUstensilsList.push(itemBtn.value)
                        break;
                    case "appareils":
                        chosenAppareilList.push(itemBtn.value)
                        break;
                    case "ingredients":
                        chosenIngredientList.push(itemBtn.value)
                        break;
                    default:
                        break;
                }
                showChosenFilter();
            })

            listDiv.appendChild(itemBtn);
        }

    })
}

function showChosenFilter() {
    let chosenFilterContainer = document.querySelector(".tag-container");
    chosenFilterContainer.textContent = "";

    chosenIngredientList.forEach(elt => {
        let chosenBtn = document.createElement('button');
        chosenBtn.className += "chosen-filter-btn";

        let chosenBtnTxt = document.createElement('div');
        chosenBtnTxt.textContent = elt;

        let chosenBtnIcon = document.createElement('i');
        chosenBtnIcon.className += "far fa-times-circle";
        chosenBtnIcon.addEventListener("click", () => {
            chosenIngredientList = chosenIngredientList.filter(e => e !== elt);
            showChosenFilter();

        })
        chosenBtn.appendChild(chosenBtnTxt);
        chosenBtn.appendChild(chosenBtnIcon);
        chosenFilterContainer.appendChild(chosenBtn);
    })

    chosenAppareilList.forEach(elt => {
        let chosenBtn = document.createElement('button');
        chosenBtn.className += "chosen-filter-btn";

        let chosenBtnTxt = document.createElement('div');
        chosenBtnTxt.textContent = elt;

        let chosenBtnIcon = document.createElement('i');
        chosenBtnIcon.className += "far fa-times-circle";
        chosenBtnIcon.addEventListener("click", () => {
            chosenAppareilList = chosenAppareilList.filter(e => e !== elt);
            showChosenFilter();

        })
        chosenBtn.appendChild(chosenBtnTxt);
        chosenBtn.appendChild(chosenBtnIcon);
        chosenFilterContainer.appendChild(chosenBtn);
    })

    chosenUstensilsList.forEach(elt => {
        let chosenBtn = document.createElement('button');
        chosenBtn.className += "chosen-filter-btn";

        let chosenBtnTxt = document.createElement('div');
        chosenBtnTxt.textContent = elt;

        let chosenBtnIcon = document.createElement('i');
        chosenBtnIcon.className += "far fa-times-circle";
        chosenBtnIcon.addEventListener("click", () => {
            chosenUstensilsList = chosenUstensilsList.filter(e => e !== elt);
            showChosenFilter();

        })
        chosenBtn.appendChild(chosenBtnTxt);
        chosenBtn.appendChild(chosenBtnIcon);
        chosenFilterContainer.appendChild(chosenBtn);
    })
}
