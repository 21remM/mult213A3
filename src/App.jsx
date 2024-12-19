import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./App.css";
import SearchBar from "./components/SearchBar";
import RecipeCard from "./components/RecipeCard";
import Favorites from "./components/Favorites";

const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const searchRecipes = async () => {
    setIsLoading(true);
    const url = apiUrl + query;
    const response = await fetch(url);
    const data = await response.json();
    setRecipes(data.meals || []);
    setIsLoading(false);
  };

  useEffect(() => {
    searchRecipes();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    searchRecipes();
  };

  const addToFavorites = (recipe) => {
    if (!favorites.some((fav) => fav.idMeal === recipe.idMeal)) {
      setFavorites([...favorites, recipe]);
    }
  };

  const removeFavorite = (idMeal) => {
    setFavorites(favorites.filter((fav) => fav.idMeal !== idMeal));
  };

  return (
    <Router>
      <div className="container">
        <h2>My Recipe App</h2>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/favorites">Favorites</Link>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchBar
                  handleSubmit={handleSubmit}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  isLoading={isLoading}
                />
                {isLoading && <p>Loading...</p>}
                <div className="recipes">
                  {recipes.length > 0
                    ? recipes.map((recipe) => (
                        <RecipeCard
                          key={recipe.idMeal}
                          recipe={recipe}
                          onFavorite={() => addToFavorites(recipe)}
                        />
                      ))
                    : !isLoading && "No Recipes Found"}
                </div>
              </>
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                favorites={favorites}
                removeFavorite={removeFavorite}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;