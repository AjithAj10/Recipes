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




 function showRandom(){

   
   let randomNo = Math.floor(Math.random() * 33);
let meal = `<div class="meal">
<img src="${data[randomNo].strMealThumb}"
>                
<div class="meal-data">
    <h3>${data[randomNo].strMeal}</h3>
    <h3>
        <i class="fa-regular fa-heart" id="${data[randomNo].idMeal}"></i>
    </h3>

</div>

<p> <b> Category : </b>${data[randomNo].strCategory}</p>
<p><b> Cuisine : </b> ${data[randomNo].strArea}</p>

<button class="btn small">Recipie</button>

<div class="description">

<p><b> Recipie : </b>${data[randomNo].strInstructions}</p>
</div>
</div>`

 meals.innerHTML = meal;

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


function addToFav(e){


    e.target.classList.toggle("fa-solid");
let id = e.target.id;

let item = data.find(e =>id == e.idMeal );

   localStorage.setItem('Fav',JSON.stringify( item.strMealThumb) );

    // localStorage.setItem('Fav',JSON.stringify( item.strMealThumb ));

renderFav();
}

function renderFav(){
    let Local = JSON.parse( localStorage.getItem('Fav') ); 

console.log(Local);
if(Local != null){
   
        
        let item = ` <li>
        <img src="${Local}"
    </li>`
        favContainer.innerHTML += item;
        
    }
};renderFav();
//Show all


 function showAll(){
    meals.innerHTML = '';

   data.forEach((e) => {

  
 let meal = `<div class="meal">
 <img src="${e.strMealThumb}"
 >                
 <div class="meal-data">
     <h3>${e.strMeal}</h3>
     <h3>
         <i class="fa-regular fa-heart"></i> 
              </h3>
 </div>
 <div class="description">
 
 <p>${e.strInstructions}</p>
 </div>
 </div>`
 
  meals.innerHTML += meal;
})

}

