const searchBtn = document.getElementById("search-btn");
const inputId = document.getElementById("input-id");
const recipeContainer = document.getElementById("recipe-container");
const dishesListContainer = document.getElementById("dishes-list-container");

const filterInput = document.getElementById("filter-input");
const filterBtn = document.getElementById("filter-btn");

let dishesData = [];

const url = `https://chinese-food-db.p.rapidapi.com/`;
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-host': 'chinese-food-db.p.rapidapi.com',
        'x-rapidapi-key': 'eb83d95cdemsh9c3821020156a85p10af9cjsn6bf112a115d4'
    }
};

const fetchAllDishes = async () => {

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        dishesData = data;  
        console.log(data);
        displayDishesList(data);
        dishesListContainer.style.display = 'block';
    } catch (error) {
        console.error('Error fetching data:', error);
        dishesListContainer.textContent = 'An error occurred while fetching data.';
        dishesListContainer.style.display = 'block';
    }
};


filterBtn.addEventListener("click", () => {
    const filterText = filterInput.value.toLowerCase();
    const filteredDishes = dishesData.filter(dish => dish.title.toLowerCase().includes(filterText));
    displayDishesList(filteredDishes);
});

searchBtn.addEventListener("click", async () => {
    const inputIdValue = inputId.value;
    const url1 = `${url}${inputIdValue}`;

    if (isNaN(inputIdValue) || inputIdValue < 1 || inputIdValue > 196) {
        alert("Error: Please enter a number between 1 and 196.");
        return;
    }


    try {
        const response = await fetch(url1, options);
        const data = await response.json();
        console.log(data);
        displayRecipe(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        recipeContainer.textContent = 'An error occurred while fetching data.';
    }
});


function displayRecipe(data) {
    const { title, difficulty, portion, time, description, image } = data;

    const recipeDiv = document.createElement("div");
    recipeDiv.className = "recipe";

    const imgElement = document.createElement("img");
    imgElement.src = image;
    imgElement.alt = title;

    const titleElement = document.createElement("h2");
    titleElement.textContent = title;

    const difficultyElement = document.createElement("p");
    difficultyElement.textContent = `Difficulty: ${difficulty}`;

    const portionElement = document.createElement("p");
    portionElement.textContent = `Portion: ${portion}`;

    const timeElement = document.createElement("p");
    timeElement.textContent = `Time: ${time}`;

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = description;

    recipeDiv.appendChild(imgElement);
    recipeDiv.appendChild(titleElement);
    recipeDiv.appendChild(difficultyElement);
    recipeDiv.appendChild(portionElement);
    recipeDiv.appendChild(timeElement);
    recipeDiv.appendChild(descriptionElement);

    recipeContainer.innerHTML = "";
    recipeContainer.appendChild(recipeDiv);
}

function displayDishesList(data) {
    dishesListContainer.innerHTML = "";
    const searchDiv = document.createElement("div");
    searchDiv.className = "search-id";

    searchDiv.appendChild(filterInput);
    searchDiv.appendChild(filterBtn);

    dishesListContainer.appendChild(searchDiv);

    const ulElement = document.createElement("ul");
    ulElement.className = "dishes-list";

    data.forEach(dish => {
        const liElement = document.createElement("li");
        liElement.textContent = `${dish.id}: ${dish.title}`;
        ulElement.appendChild(liElement);
    });

    dishesListContainer.appendChild(ulElement);
}

await fetchAllDishes();
