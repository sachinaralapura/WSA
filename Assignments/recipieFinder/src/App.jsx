import { useState } from "react";
import IngredientSearch from "./components/IngredientSearch";
import Recipes from "./components/Recipes";

const api_key = import.meta.env.VITE_API_KEY;
const base_url = import.meta.env.VITE_BASE_URL;

function App() {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const onSearch = () => {
    if (ingredients.length > 0) {
      fetchRecipes();
    }
  };

  const fetchRecipes = async () => {
    try {
      const response = await fetch(
        `${base_url}recipes/findByIngredients?apiKey=${api_key}&ingredients=${ingredients.join(
          ","
        )}&number=10`
      );
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <IngredientSearch
          ingredients={ingredients}
          setIngredients={setIngredients}
          onSearch={onSearch}
        />
        {recipes.length > 0 && <Recipes recipes={recipes} />}
      </div>
    </div>
  );
}

export default App;
