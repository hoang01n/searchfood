import React, {useState, useEffect} from "react";
import axios from "axios"; // Import Axios
import "./style.css";
import food from "./food.jpg";

function Food() {
  const [searchInput, setSearchInput] = useState("");
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [showRecipe, setShowRecipe] = useState(false);
  // Move the logic for fetching meal list here
  const getMealList = () => {
    if (searchInput.trim() !== "") {
      axios
        .get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`
        )
        .then((response) => {
          if (response.data.meals) {
            setMeals(response.data.meals);
            setShowRecipe(false); // Close any open recipe details
          } else {
            setMeals([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  };

  useEffect(() => {
    // Logic for fetching meal list based on searchInput
    if (searchInput.trim() !== "") {
      axios
        .get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`
        )
        .then((response) => {
          if (response.data.meals) {
            setMeals(response.data.meals);
            setShowRecipe(false); // Close any open recipe details
          } else {
            setMeals([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [searchInput]);

  const getMealRecipe = (mealId) => {
    // Logic for fetching meal recipe by mealId
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then((response) => {
        if (response.data.meals) {
          setSelectedMeal(response.data.meals[0]);
          setShowRecipe(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching recipe:", error);
      });
  };

  const closeRecipeModal = () => {
    setShowRecipe(false);
  };

  return (
    <div>
      <div className="container">
        <div className="meal-wrapper">
          <div className="meal-search">
            <h2 className="title">Find Meals For Your Ingredients</h2>
            <blockquote>
              Real food doesn't have ingredients, real food is ingredients.
              <cite>- Hoang le</cite>
            </blockquote>

            <div className="meal-search-box">
              <input
                type="text"
                className="search-control"
                placeholder="Enter an ingredient"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button
                type="submit"
                className="search-btn btn"
                onClick={getMealList} // Use the getMealList function here
              >
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="meal-result">
          <h2 className="title">Your Search Results:</h2>
          <div id="meal">
            {meals.length > 0 ? (
              meals.map((meal) => (
                <div className="meal-item" key={meal.idMeal}>
                  <div className="meal-img">
                    <img src={meal.strMealThumb} alt="food" />
                  </div>
                  <div className="meal-name">
                    <h3>{meal.strMeal}</h3>
                    <a
                      href="#"
                      className="recipe-btn"
                      onClick={() => getMealRecipe(meal.idMeal)}
                    >
                      Get Recipe
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="notFoundContainer">
                <p className="notFound">Sorry, we didn't find any meal!</p>
              </div>
            )}
          </div>
        </div>

        <div className={`meal-details ${showRecipe ? "showRecipe" : ""}`}>
          <button
            type="button"
            className="btn recipe-close-btn"
            id="recipe-close-btn"
            onClick={closeRecipeModal}
          >
            <i className="fas fa-times"></i>
          </button>

          {selectedMeal && (
            <div className="meal-details-content">
              <h2 className="recipe-title">{selectedMeal.strMeal}</h2>
              <p className="recipe-category">{selectedMeal.strCategory}</p>
              <div className="recipe-instruct">
                <h3>Instructions:</h3>
                <p>{selectedMeal.strInstructions}</p>
              </div>
              <div className="recipe-meal-img">
                <img src={selectedMeal.strMealThumb} alt="" />
              </div>
              <div className="recipe-link">
                <a
                  href={selectedMeal.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Watch Video
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Food;
