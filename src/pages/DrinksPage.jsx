import { func } from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import {
  fetchDrinksRecipes,
  requiredTypeButtonClick,
  requiredCategorieDrinks,
  typePageSelect,
} from '../redux/actions/action';
import { buttonsCategorieDrinks } from '../services/categoriesButtonAPI';
import DrinkIngredientsApi from '../services/DrinkIngredientsApi';
import DrinksFirstLetterApi from '../services/DrinksFirstLetterApi';
import DrinksNameApi from '../services/DrinksNameApi';
import { recipesDrinksAPI } from '../services/RecipesAPI';
import ButtonsCategories from '../components/ButtonsCategories';

function DrinkRecipes({
  requiredFetchDrinksRecipe,
  first,
  nome,
  redquiredTypeButton,
  requiredFetchDrinksCategories,
  drinksCategories,
  typePageS,
}) {
  useEffect(() => {
    (async () => {
      const categories = await buttonsCategorieDrinks();
      typePageS('drinks');
      requiredFetchDrinksCategories(categories);
      const recipes = await recipesDrinksAPI();
      requiredFetchDrinksRecipe(recipes);
    })();
  }, [requiredFetchDrinksRecipe, requiredFetchDrinksCategories, typePageS]);

  const handClick = async () => {
    redquiredTypeButton('drinks');
    if (first === 'Ingredient') {
      const a = await DrinkIngredientsApi(nome);
      if(a.length > 0) {
        requiredFetchDrinksRecipe(a);
      } else {
        global.alert('Sorry, we haven\'t found any recipes for these filters.')
      }
    } else if (first === 'Name') {
      const a = await DrinksNameApi(nome);
      if(a.length > 0) {
        requiredFetchDrinksRecipe(a);
      } else {
        global.alert('Sorry, we haven\'t found any recipes for these filters.')
      }
    } else if (first === 'First letter' && nome.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      const a = await DrinksFirstLetterApi(nome);
      if(a.length > 0) {
        requiredFetchDrinksRecipe(a);
      } else {
        global.alert('Sorry, we haven\'t found any recipes for these filters.')
      }
    }
  };
  return (
    <section>
      <Header search titlePage="Drinks" iconProfile iconSearch click={ handClick } />
      {drinksCategories.length > 0 && (
        <ButtonsCategories categories={ drinksCategories } />
      )}
      <Recipes />
      <Footer />
    </section>
  );
}
const mapStateToProps = (state) => ({
  recipesMeals: state.reducerFetch.recipesMeals,
  first: state.reducerFetch.hand,
  nome: state.reducerFetch.name,
  drinksCategories: state.reducerFetch.buttonsCategorieDrinks,
});
const mapDispatchToProps = (dispatch) => ({
  requiredFetchDrinksRecipe: (recipes) => dispatch(fetchDrinksRecipes(recipes)),
  requiredFetchDrinksCategories: (cate) => dispatch(requiredCategorieDrinks(cate)),
  redquiredTypeButton: (type) => dispatch(requiredTypeButtonClick(type)),
  typePageS: (page) => dispatch(typePageSelect(page)),
});
DrinkRecipes.propTypes = {
  requiredFetchDrinksRecipe: func,
}.isrequired;
export default connect(mapStateToProps, mapDispatchToProps)(DrinkRecipes);
