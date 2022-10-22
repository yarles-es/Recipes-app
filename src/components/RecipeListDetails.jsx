import React, { useEffect, useState } from 'react';
import { func } from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  getFavoriteRecipesLocalStorage,
} from '../localStorageFunctions/functionsGetLocalStorage';
import {
  setFavoriteRecipesLocalStorage,
} from '../localStorageFunctions/functionsSetLocalStorage';
import iconeOff from '../images/whiteHeartIcon.svg';
import iconeOn from '../images/blackHeartIcon.svg';
import iconShare from '../images/shareIcon.svg';
import './RecipeDetails.css';

const copy = require('clipboard-copy');

function RecipeListDetails({
  setRecommendationDrinks,
  setRecommendationMeals,
  dataRecipes,
  recommendationDrinks,
  recommendationMeals,
}) {
  const history = useHistory();
  const [confirmCopy, setConfirmCopy] = useState(false);
  const [favorites, setFvorites] = useState([]);
  const [favoritClicked, setFavoritClicked] = useState(false);

  useEffect(() => {
    const requiredFavorites = () => {
      const favorit = getFavoriteRecipesLocalStorage();
      setFvorites(favorit);
      const verificationFavorit = favorites ? favorites
        .find((fav) => fav.id === dataRecipes.id) : false;
      setFavoritClicked(verificationFavorit);
    };
    requiredFavorites();
  }, [dataRecipes]);

  const setFavotires = () => {
    setFavoritClicked(!favoritClicked);
    const {
      id, type, nationality, categorie, alcoholic: alcoholicOrNot, title: name, image,
    } = dataRecipes;
    const typ = type === 'meals' ? 'meal' : 'drink';
    if (!favorites) {
      const data = [
        {
          id,
          type: typ,
          nationality,
          category: categorie,
          alcoholicOrNot,
          name,
          image,
        },
      ];
      setFavoriteRecipesLocalStorage(data);
    } else if (favorites) {
      if (favoritClicked) {
        const removeFav = favorites.filter((fav) => fav.id !== dataRecipes.id);
        setFavoriteRecipesLocalStorage(removeFav);
      } else {
        const data = [...favorites,
          {
            id, type: typ, nationality, category: categorie, alcoholicOrNot, name, image,
          },
        ];
        setFavoriteRecipesLocalStorage(data);
      }
    }
  };

  const clickedCopy = () => {
    setConfirmCopy(true);
    copy(`http://localhost:3000${history.location.pathname}`);
  };

  return (
    <div className="container-details">
      <img
        className="image-recipes-details"
        data-testid="recipe-photo"
        src={ dataRecipes.image }
        alt={ dataRecipes.title }
      />
      <div className="buttons-interaction">
        <label htmlFor="favorit">
          <input
            className="check-image"
            type="checkbox"
            name="favorit"
            id="favorit"
            onClick={ setFavotires }
            checked={ favoritClicked }
          />
          <img
            data-testid="favorite-btn"
            src={ favoritClicked ? iconeOn : iconeOff }
            alt="icone-favorit"
          />
        </label>

        <label htmlFor="compartilhar">
          <button
            className="button-compartilhar"
            id="compartilhar"
            onClick={ clickedCopy }
            data-testid="share-btn"
            type="button"
          >
            <img src={ iconShare } alt="icone-compartilhar" />
          </button>
        </label>
      </div>
      
      {confirmCopy && <p>Link copied!</p>}
      
      <h1 className="title-details" data-testid="recipe-title">{dataRecipes.title}</h1>
      <h4 className="title-category"><strong>Category</strong></h4>
      <div className="category-details">
        <p data-testid="recipe-category">{dataRecipes.categorie}</p>
        {dataRecipes.alcoholic && (
          <p data-testid="recipe-category">{dataRecipes.alcoholic}</p>
        )}
      </div>
      <h4 className="title-ingredients"><strong>Ingredients</strong></h4>
      <div className="container-ingredients">
        <div>
          { dataRecipes.ingredients.map((ingredient, index) => (
            <p
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {ingredient}
            </p>
          ))}
        </div>
        <div>
          {dataRecipes.amounts && dataRecipes.amounts.map((data, index) => (
            <p
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ index }
            >
              {data}
            </p>
          ))}
        </div>
      </div>
        <h4 className="title-instructions"><strong>Instructions</strong></h4>
        <div className="container-instructions">
        <p data-testid="instructions">{dataRecipes.instructions}</p>
      </div>
      <h4 className="title-instructions"><strong>Vídeo</strong></h4>
      {dataRecipes.videoUrl && (
        <iframe
          data-testid="video"
          width="400"
          height="250"
          src={ `${dataRecipes.videoUrl[0]}/embed/${dataRecipes.videoUrl[1]}` }
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay;
              clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
        <h4 className="title-instructions"><strong>Recommended</strong></h4>
      <div className="container-recommendation">
        { recommendationDrinks && setRecommendationDrinks() }
        { recommendationMeals && setRecommendationMeals() }
      </div>
    </div>
  );
}

RecipeListDetails.propTypes = {
  setRecommendationDrinks: func,
}.isrequired;

export default RecipeListDetails;
