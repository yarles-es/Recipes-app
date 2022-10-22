import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { object } from 'prop-types';
import MealsIngredient from './MealsIngredient';
import {
  getDoneRecipesLocalStorage,
  getFavoriteRecipesLocalStorage,
} from '../localStorageFunctions/functionsGetLocalStorage';
import {
  setDoneRecipesLocalStorage,
  setFavoriteRecipesLocalStorage,
} from '../localStorageFunctions/functionsSetLocalStorage';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function RevenueOfMeals({ meals }) {
  const [sizeOfRevenue, setSizeOfRevenue] = useState(0);
  const [sizeOfFinishSteps, setSizeOfFinishSteps] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [confirmCopy, setConfirmCopy] = useState(false);
  const [saveInLocalHistorage, setSaveInLocalHistorage] = useState(false);
  const [dataRecipes, setDataRecipes] = useState({
    alcoholicOrNot: '',
    category: '',
    id: '',
    image: '',
    name: '',
    nationality: '',
    type: 'meal',
  });
  const history = useHistory();

  const clickedCopy = () => {
    setConfirmCopy(true);
    const url = history.location.pathname.split('/');
    copy(`http://localhost:3000/${url[1]}/${url[2]}`);
  };

  const digit2 = (number) => {
    const MAGIC = 10;
    if (number < MAGIC) return `0${number}`;
    return number;
  };

  const converterDate = () => {
    const d = new Date();
    const day = `${digit2(d.getDate())}/${digit2(d.getMonth())}/${d.getFullYear()}`;
    return (day);
  };

  const handlerMeals = (mealRecipe) => {
    const newRecipe = ({
      id: mealRecipe.idMeal,
      type: 'meal',
      nationality: mealRecipe.strArea,
      category: mealRecipe.strCategory,
      alcoholicOrNot: '',
      name: mealRecipe.strMeal,
      image: mealRecipe.strMealThumb,
      doneDate: converterDate(),
      tags: mealRecipe.strTags?.split(',') ?? '',
    });
    return newRecipe;
  };

  const getFavorites = () => getFavoriteRecipesLocalStorage();

  const saveFromLocalHistorage = () => {
    const recipesLocalHistorage = getFavorites();
    if (!recipesLocalHistorage) {
      setFavoriteRecipesLocalStorage([{ id: meals[0].idMeal }]);
    }
    const getRecipesUpdated = getFavorites();
    const recipeInProgress = getRecipesUpdated.filter(
      (recipe) => recipe.id !== meals[0].idMeal && recipe !== [],
    );
    if (!recipeInProgress[0]) {
      setFavoriteRecipesLocalStorage([dataRecipes]);
    } else {
      setFavoriteRecipesLocalStorage([...recipeInProgress, dataRecipes]);
    }
  };

  const removeFromLocalHistorage = () => {
    const recipesLocalHistorage = getFavorites();
    const recipeFavorite = recipesLocalHistorage.filter(
      (recipe) => recipe.id !== meals[0].idMeal && recipe !== [],
    );
    if (recipeFavorite.length === 0) {
      setFavoriteRecipesLocalStorage([]);
    } else {
      setFavoriteRecipesLocalStorage([recipeFavorite]);
    }
  };

  const handleClickFavorite = () => {
    if (!saveInLocalHistorage) {
      saveFromLocalHistorage();
      setSaveInLocalHistorage(true);
    } else {
      removeFromLocalHistorage();
      setSaveInLocalHistorage(false);
    }
  };

  useEffect(() => {
    const recipesLocalHistorage = getFavorites();
    if (recipesLocalHistorage) {
      const isFavorite = recipesLocalHistorage.some(
        (favorite) => favorite.id === meals[0].idMeal,
      );
      setSaveInLocalHistorage(isFavorite);
    }
  }, [meals, saveInLocalHistorage]);

  useEffect(() => {
    setDataRecipes({
      alcoholicOrNot: '',
      category: meals[0].strCategory,
      id: meals[0].idMeal,
      image: meals[0].strMealThumb,
      name: meals[0].strMeal,
      nationality: meals[0].strArea,
      type: 'meal',
    });
  }, [meals]);

  useEffect(() => {
    const verifyIsDisabled = sizeOfRevenue === sizeOfFinishSteps;
    setIsDisabled(verifyIsDisabled);
    const allDoneRecipes = getDoneRecipesLocalStorage();
    setDoneRecipes(allDoneRecipes);
  }, [sizeOfRevenue, sizeOfFinishSteps, isDisabled]);

  const handleClick = () => {
    const newObjectMeal = { ...handlerMeals(meals[0]) };
    if (!doneRecipes) {
      setDoneRecipesLocalStorage([newObjectMeal]);
    } else {
      setDoneRecipesLocalStorage([...doneRecipes, newObjectMeal]);
    }
    history.push('/done-recipes');
  };

  return (
    <div>
      {meals.length > 0 && (
        <div>
          <div>
            <div className="container-details">
              <img
                src={ `${meals[0].strMealThumb}` }
                alt={ `foto de ${meals[0].strMeal}` }
                data-testid="recipe-photo"
                className="image-recipes"
              />
              <h3 data-testid="recipe-title">{meals[0].strMeal}</h3>
              <p data-testid="recipe-category">
                Categoria:
                {': '}
                {meals[0].strCategory}
              </p>
              <MealsIngredient
                meals={ meals }
                setSizeOfRevenue={ setSizeOfRevenue }
                setSizeOfFinishSteps={ setSizeOfFinishSteps }
              />
              <p data-testid="instructions">
                Instruções:
                {' '}
                {meals[0].strInstructions}
              </p>
            </div>
            <button type="button" data-testid="share-btn" onClick={ clickedCopy }>
              Compartilhar
            </button>
            {confirmCopy && <p>Link copied!</p>}

            <button
              type="button"
              data-testid="favorite-btn"
              onClick={ handleClickFavorite }
              src={ saveInLocalHistorage ? blackHeart : whiteHeart }
            >
              <img
                src={ saveInLocalHistorage ? blackHeart : whiteHeart }
                alt="foto de favorito"
              />
            </button>

            <button
              type="button"
              data-testid="finish-recipe-btn"
              disabled={ !isDisabled }
              onClick={ handleClick }
            >
              Finalizar a receita
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RevenueOfMeals;

RevenueOfMeals.propTypes = {
  meals: object,
}.isRequired;
