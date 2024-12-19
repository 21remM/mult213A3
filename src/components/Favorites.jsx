import React from "react";
import RecipeCard from "./RecipeCard";

const Favorites = ({ favorites, removeFavorite }) => {
  return (
    <div className="favorites">
      <h2>Your Favorites</h2>
      <div className="recipes">
        {favorites.length > 0
          ? favorites.map((recipe) => (
              <RecipeCard
                key={recipe.idMeal}
                recipe={recipe}
                onFavorite={() => removeFavorite(recipe.idMeal)}
              />
            ))
          : "No favorite recipes yet!"}
      </div>
    </div>
  );
};

export default Favorites;