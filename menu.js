
function getMealList(){
    let searchInputTxt = document.getElementById("search-input").value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data =>{
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html +=`
                <div class="meal-item" data-id = "${meal.idMeal}">
                    <div class="meal-img">
                     <img class="img" src="${meal.strMealThumb}" alt="food">
                    </div>
                  <div class="meal-name">
                   <h4>${meal.strMeal}</h4>
                  </div>
                   <div class='meal-link'>
                     <a href="#" class="recipe-btn">Get Recipe</a>
                  </div>
                </div> `    
            });
            mealList.classList.remove("notFound");
        }else{
            html = "Sorry,we didn't find any meal";
            mealList.classList.add("notFound")
        }
        mealList.innerHTML = html;
    })
}

function getMealRecipe(e){
    e.preventDefault() ;
    if(e.target.classList.contains("recipe-btn")){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response =>response.json())
        .then(data =>mealRecipeModal(data.meals))   
    }
}
function mealRecipeModal(meal){
    
        meal = meal[0];
        let html = `
        <button type="button" class="btn recipe-close-btn" id="recipe-close-btn">
        <i class="fas fa-times"></i>
        </button>

        <div class="meal-details-content">
        <h2 class="recipe-title">${meal.strMeal}</h2>
                        <p class="recipe-category">${meal.strCategory}</p>
                        <div class="recipe-instruction">
                        <h3>Instruction:</h3>
                        <p>${meal.strInstructions} </p>
                        </div>
                    
                      <div class="recipe-meal-img">
                        <img  src="${meal.strMealThumb}" alt = "">
                      </div>
                      <div class="recipe-link">
                         <a href="${meal.strYoutube}" target="-blank">Watch Video</a>
                      </div>`
                      
                      mealDetailsContent.innerHTML = html;
                      mealDetailsContent.parentElement.classList.add("showRecipe")
        
    
}