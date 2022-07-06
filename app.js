//https://www.themealdb.com/api/json/v1/1/search.php?f=b          - Api call 
let meals = document.querySelector('.meals');
let data = [];
const favContainer = document.querySelector('.fav-container');

const fav = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=b');
     data = await response.json();
     data = data.meals;
     console.log(data);

     for(let i=0; i<4;i++){
     let randomNo = Math.floor(Math.random() * 33);

     let item = ` <li>
     <img src="${data[randomNo].strMealThumb}"
 </li>`
     favContainer.innerHTML += item;
     }

}; fav();




async function showRandom(){

   
   let randomNo = Math.floor(Math.random() * 33);
let meal = `<div class="meal">
<img src="${data[randomNo].strMealThumb}"
>                
<div class="meal-data">
    <h3>${data[randomNo].strMeal}</h3>
    <h3>
        <i class="fa-regular fa-heart"></i>
    </h3>

</div>

<p> <b> Category : </b>${data[randomNo].strCategory}</p>
<p><b> Cuisine : </b> ${data[randomNo].strArea}</p>

<button id="${data[randomNo].id}" class="btn small">Recipie</button>

<div class="description">

<p><b> Recipie : </b>${data[randomNo].strInstructions}</p>
</div>
</div>`

 meals.innerHTML = meal;

 const btn = document.querySelector('.small');
  const descr = document.querySelector('.description');
 
  btn.addEventListener('click',toggler);

 function toggler(e){
   
     descr.innetHTML += `<p>ok</p>`
    
    descr.classList.toggle('show');
    if(descr.classList.contains('show')){
        e.target.textContent = 'hide';
    }else{
        e.target.textContent = 'Recipie';

    }

  }
}



//Show all


async function showAll(){
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

