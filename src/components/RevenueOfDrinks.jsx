import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { object } from 'prop-types';
import DrinksIngredient from './DrinksIngredient';
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

function RevenueOfDrinks({ drinks }) {
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
    type: 'drink',
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

  const handlerDrinks = (drinksRecipe) => {
    const newRecipe = ({
      id: drinksRecipe.idDrink,
      type: 'drink',
      nationality: '',
      category: drinksRecipe.strCategory,
      alcoholicOrNot: drinksRecipe.strAlcoholic,
      name: drinksRecipe.strDrink,
      image: drinksRecipe.strDrinkThumb,
      doneDate: converterDate(),
      tags: drinksRecipe.strTags?.split(',') ?? '',
    });
    return newRecipe;
  };

  const getFavorites = () => getFavoriteRecipesLocalStorage();

  const saveFromLocalHistorage = () => {
    const recipesLocalHistorage = getFavorites();
    if (!recipesLocalHistorage) {
      setFavoriteRecipesLocalStorage([
        {
          id: drinks[0].idDrink,
        },
      ]);
    }

    const getRecipesUpdated = getFavorites();
    const recipeInProgress = getRecipesUpdated.filter(
      (recipe) => recipe.id !== drinks[0].idDrink && recipe !== [],
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
      (recipe) => recipe.id !== drinks[0].idDrink && recipe !== [],
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
        (favorite) => favorite.id === drinks[0].idDrink,
      );
      setSaveInLocalHistorage(isFavorite);
    }
  }, [drinks, saveInLocalHistorage]);

  useEffect(() => {
    setDataRecipes({
      alcoholicOrNot: drinks[0].strAlcoholic,
      category: drinks[0].strCategory,
      id: drinks[0].idDrink,
      image: drinks[0].strDrinkThumb,
      name: drinks[0].strDrink,
      nationality: '',
      type: 'drink',
    });
  }, [drinks]);

  useEffect(() => {
    const verifyIsDisabled = sizeOfRevenue === sizeOfFinishSteps;
    setIsDisabled(verifyIsDisabled);
    const allDoneRecipes = getDoneRecipesLocalStorage();
    setDoneRecipes(allDoneRecipes);
  }, [sizeOfRevenue, sizeOfFinishSteps, isDisabled]);

  const handleClick = () => {
    const newObjectDrink = { ...handlerDrinks(drinks[0]) };
    if (!doneRecipes) {
      setDoneRecipesLocalStorage([newObjectDrink]);
    } else {
      setDoneRecipesLocalStorage([...doneRecipes, newObjectDrink]);
    }
    history.push('/done-recipes');
  };

  return (
    <div>
      {drinks.length > 0 && (
        <div>
          <div>
            <div className="container-details">
              <img
                src={ `${drinks[0].strDrinkThumb}` }
                alt={ `foto de ${drinks[0].strCategory}` }
                data-testid="recipe-photo"
                className="image-recipes"
              />
              <h3 data-testid="recipe-title">{drinks[0].strGlass}</h3>
              <p data-testid="recipe-category">
                Tipo de drink:
                {' '}
                {drinks[0].strAlcoholic}
              </p>
              <DrinksIngredient
                drinks={ drinks }
                setSizeOfRevenue={ setSizeOfRevenue }
                setSizeOfFinishSteps={ setSizeOfFinishSteps }
              />
              <div>
                <p data-testid="instructions">{drinks[0].strInstructions}</p>
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
        </div>
      )}
    </div>
  );
}

export default RevenueOfDrinks;

RevenueOfDrinks.propTypes = {
  recipe: object,
}.isrequired;
