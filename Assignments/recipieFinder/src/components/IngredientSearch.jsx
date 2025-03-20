import { useState } from "react";
function IngredientSearch({ ingredients, setIngredients, onSearch }) {
  const [ingredient, setIngredient] = useState("");

  const handleAddIngredient = () => {
    if (!ingredient) return;
    if (ingredients.includes(ingredient)) return;
    setIngredients((prev) => [...prev, ingredient]);
    setIngredient("");
  };

  const removeIngredient = (ingredient) => {
    setIngredients((prev) => prev.filter((item) => item !== ingredient));
  };

  return (
    <div className="search-container">
      <h1 className="title">Ingredient Search</h1>
      <input
        className="input"
        placeholder="add ingredient"
        type="text"
        value={ingredient}
        onChange={(e) => setIngredient(e.target.value)}
      />
      <button className="add-btn button" onClick={handleAddIngredient}>
        Add
      </button>

      {ingredients && (
        <div className="ingredients">
          {ingredients.map((ingredient, index) => (
            <span key={index}>
              {ingredient}{" "}
              <span
                className="rm-ing"
                onClick={() => removeIngredient(ingredient)}
              >
                x
              </span>{" "}
            </span>
          ))}
        </div>
      )}

      <div>
        <button className="search-btn button" onClick={onSearch}>
          Search Recipes
        </button>
      </div>
    </div>
  );
}

export default IngredientSearch;
