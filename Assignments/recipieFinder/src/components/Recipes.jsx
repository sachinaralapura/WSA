import { memo } from "react";

function RecipeCard({ recipe }) {
  console.log(recipe);
  return (
    <div className="recipe-card-container">
      <h1 className="title">{recipe.title}</h1>
      <img src={recipe.image} alt="" className="image" />
    </div>
  );
}

function Recipes({ recipes }) {
  return (
    <div className="recipes-container">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}

export default memo(Recipes);
