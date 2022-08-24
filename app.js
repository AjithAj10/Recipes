//https://www.themealdb.com/api/json/v1/1/search.php?f=b          - Api call

window.addEventListener("load", () => {
  //localStorage.clear();
  //favContainer.innerHTML = '';
});

let meals = document.querySelector(".meals");
let data = [];
const favContainer = document.querySelector(".fav");

const fav = async () => {
  var response;
  try {
    response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/search.php?f=b"
    );
  } catch (error) {
    alert("Please check internet connection");
    console.log(error);
  }
  data = await response.json();
  data = data.meals;
};
fav();

function show(key, caller) {
  let meal = `<div class="meal">
<img src="${data[key].strMealThumb}"
>                
<div class="meal-data">
    <h3>${data[key].strMeal}</h3>
    <h3>
        <i class="fa-regular fa-heart" id="${data[key].idMeal}"></i>
    </h3>

</div>

<p> <b> Category : </b>${data[key].strCategory}</p>
<p><b> Cuisine : </b> ${data[key].strArea}</p>

<button class="btn small">Recipie</button>

<div class="description">

<p><b> Recipie : </b>${data[key].strInstructions}</p>
</div>
</div>`;
  if (caller == "all") {
    meals.innerHTML += meal;
  } else {
    meals.innerHTML = meal;
  }

  const btn = document.querySelectorAll(".small");
  const descr = document.querySelectorAll(".description");

  btn.forEach((item) => {
    item.addEventListener("click", toggler);
  });

  function toggler(e) {
    const descr = e.target.parentNode.children[5];
    descr.classList.toggle("show");
    if (descr.classList.contains("show")) {
      e.target.textContent = "hide";
    } else {
      e.target.textContent = "Recipie";
    }
  } //End of Toggler

  const heartIcon = document.querySelector(".fa-heart");

  heartIcon.addEventListener("click", addToFav);
}

function showRandom() {
  let randomNo = Math.floor(Math.random() * 33);

  show(randomNo, "random");
}

const searchByName = () => {
  let food = document.getElementById("search-term").value;
  meals.innerHTML = "";
  food = food.toLowerCase();

  for (let i = 0; i < data.length; i++) {
    //Search food by first name || by subCategory
    if (
      data[i].strMeal.split(" ")[0].toLowerCase() == food ||
      data[i].strCategory.toLowerCase() == food
    ) {
      show(i, "all");
    }
  }
};

function addToFav(e) {
  e.target.classList.toggle("fa-solid");
  let id = e.target.id;

  let item = data.find((e) => id == e.idMeal);
  let prevData = JSON.parse(localStorage.getItem("Fav"));

  prevData
    ? localStorage.setItem("Fav", JSON.stringify([...prevData, item]))
    : localStorage.setItem("Fav", JSON.stringify([item]));

  // localStorage.setItem('Fav',JSON.stringify( item.strMealThumb ));

  renderFav();
}

function renderFav() {
  let Local = JSON.parse(localStorage.getItem("Fav"));
  favContainer.innerHTML = "";

  console.log(Local);
  if (Local != null) {
    for (i = 0; i < Local.length; i++) {
      let item = ` <li onclick=favLi(event) >
        <img src="${Local[i].strMealThumb}" id='${Local[i].idMeal}'>
    </li>`;
      favContainer.innerHTML += item;
    }
  }
}
renderFav();

// fav Detail page
// const popUp = document.querySelector(".popup-container");
// const mealInfo = document.querySelector(".meal-info");
const favLi = (e) => {
  console.log(e.target.id);

  const localData = JSON.parse(localStorage.getItem("Fav"));

  let key = localData.find((item) => item.idMeal == e.target.id);
//console.log(key);
  let meal = `<div class="meal">
    <img src="${key.strMealThumb}">                
        <div class="meal-data">
        <h3>${key.strMeal}</h3>
   

</div>

<p> <b> Category : </b>${key.strCategory}</p>
<p><b> Cuisine : </b> ${key.strArea}</p>

<button class="btn small">Recipie</button>

<div class="description">

<p><b> Recipie : </b>${key.strInstructions}</p>
</div>
</div>`;

    meals.innerHTML = meal;


    const btn = document.querySelectorAll(".small");
    const descr = document.querySelectorAll(".description");
  
    btn.forEach((item) => {
      item.addEventListener("click", toggler);
    });
  
    function toggler(e) {
      const descr = e.target.parentNode.children[5];
      descr.classList.toggle("show");
      if (descr.classList.contains("show")) {
        e.target.textContent = "hide";
      } else {
        e.target.textContent = "Recipie";
      }
    } //End of Toggler
  
   
};

//Show all
function showAll() {
  meals.innerHTML = "";

  for (i = 0; i < data.length; i++) {
    show(i, "all");
  }
}

