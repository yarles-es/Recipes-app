import { array } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CardRecipes from './CardRecipe';
import './Recipes.css';

function Recipes({ recipesDrinks, recipesMeals, buttonClick, categorySelected }) {
  const history = useHistory();

  const redirectDrinks = () => {
    const { idDrink } = recipesDrinks[0];
    history.push(`/drinks/${idDrink}`);
  };

  const redirectMeals = () => {
    const { idMeal } = recipesMeals[0];
    history.push(`/meals/${idMeal}`);
  };

  const listDrinks = () => {
    if (recipesDrinks && recipesDrinks.length === 1 && !categorySelected) {
      redirectDrinks();
    } else {
      const list = recipesDrinks.map((drink, i) => {
        const { idDrink: id, strDrinkThumb, strDrink } = drink;
        return (
          <CardRecipes
            key={ i }
            id={ id }
            indice={ i }
            image={ strDrinkThumb }
            name={ strDrink }
          />
        );
      });
      return list;
    }
  };

  const listMeals = () => {
    if (recipesMeals && recipesMeals.length === 1 && !categorySelected) {
      redirectMeals();
    } else {
      const list = recipesMeals.map((meals, i) => {
        const { idMeal: id, strMealThumb, strMeal } = meals;
        return (
          <CardRecipes
            key={ i }
            id={ id }
            indice={ i }
            image={ strMealThumb }
            name={ strMeal }
          />
        );
      });
      return list;
    }
  };

  return (
    <ol className="container-recipes" data-testid="cards">
      { listDrinks() }
      { listMeals() }
    </ol>
  );
}

const mapStateToProps = (state) => ({
  recipesDrinks: state.reducerFetch.recipesDrinks,
  recipesMeals: state.reducerFetch.recipesMeals,
  buttonClick: state.reducerFetch.buttonClick,
  categorySelected: state.reducerFetch.categorySelected,
});

Recipes.propTypes = {
  allRecipes: array,
}.isrequered;

export default connect(mapStateToProps, null)(Recipes);
