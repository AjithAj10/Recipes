//https://www.themealdb.com/api/json/v1/1/search.php?f=b          - Api call 

window.addEventListener('load', () => {
    localStorage.clear();
    favContainer.innerHTML = '';
})

let meals = document.querySelector('.meals');
let data = [];
const favContainer = document.querySelector('.fav-container');

const fav = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=b');
     data = await response.json();
     data = data.meals;

}; fav();


function show(key,caller){
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
</div>`
if(caller == 'all'){
 meals.innerHTML += meal;
}else{
    meals.innerHTML = meal;

}
}


 function showRandom(){

   
   let randomNo = Math.floor(Math.random() * 33);

show(randomNo,'random');

 const btn = document.querySelector('.small');
  const descr = document.querySelector('.description');
 
  btn.addEventListener('click',toggler);

 function toggler(e){
    console.log(e.target.id);
    descr.classList.toggle('show');
    if(descr.classList.contains('show')){
        e.target.textContent = 'hide';
    }else{
        e.target.textContent = 'Recipie';

    }

  };//End of Toggler

const heartIcon = document.querySelector('.fa-heart');

heartIcon.addEventListener('click', addToFav);
 
}

const searchByName = async() => {
    let food = document.getElementById('search-term');

    const response = await fetch('');
    data = await response.json();
}

function addToFav(e){


    e.target.classList.toggle("fa-solid");
let id = e.target.id;

let item = data.find(e =>id == e.idMeal );

   localStorage.setItem('Fav',JSON.stringify( [item ]) );

    // localStorage.setItem('Fav',JSON.stringify( item.strMealThumb ));

renderFav();
}

function renderFav(){
    let Local = JSON.parse( localStorage.getItem('Fav') ); 

console.log(Local);
if(Local != null){
   
        
        let item = ` <li>
        <img src="${Local.strMealThumb}"
    </li>`
        favContainer.innerHTML += item;
        
    }
};renderFav();
//Show all


 function showAll(){
    meals.innerHTML = '';

for(i =0; i<data.length;i++){
  
show(i,'all');
}

}

