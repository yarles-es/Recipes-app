import { func } from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import {
  fetchMealsRecipes,
  requiredCategorieMeals,
  requiredTypeButtonClick,
  typePageSelect,
} from '../redux/actions/action';
import FirstApi from '../services/FirstApi';
import IngredientApi from '../services/IngredientApi';
import NameApi from '../services/NameApi';
import { recipesMealsAPI } from '../services/RecipesAPI';
import { buttonsCategorieMeals } from '../services/categoriesButtonAPI';
import ButtonsCategories from '../components/ButtonsCategories';


function MealsRecipes({
  requiredFetchMealsRecipe,
  first,
  nome,
  requiredFetchMealsCategories,
  mealsCategories,
  redquiredTypeButton,
  typePageS,
}) {
  useEffect(() => {
    (async () => {
      const categories = await buttonsCategorieMeals();
      typePageS('meals');
      requiredFetchMealsCategories(categories);
      const recipes = await recipesMealsAPI();
      requiredFetchMealsRecipe(recipes);
    })();
  }, [requiredFetchMealsRecipe, requiredFetchMealsCategories, typePageS]);

  const handClick = async () => {
    redquiredTypeButton('meals');
    if (first === 'Ingredient') {
      const a = await IngredientApi(nome);
      if(a.length > 0) {
        requiredFetchMealsRecipe(a);
      } else {
        global.alert('Sorry, we haven\'t found any recipes for these filters.')
      }
    } else if (first === 'Name') {
      const a = await NameApi(nome);
      if(a.length > 0) {
        requiredFetchMealsRecipe(a);
      } else {
        global.alert('Sorry, we haven\'t found any recipes for these filters.')
      }
    } else if (first === 'First letter' && nome.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      const a = await FirstApi(nome);
      if(a.length > 0) {
        requiredFetchMealsRecipe(a);
      } else {
        global.alert('Sorry, we haven\'t found any recipes for these filters.')
      }
    }
    
  };
  return (
    <div>
      <div className="container-header-filter-search">
        <Header search titlePage="Meals" iconProfile iconSearch click={ handClick } />
      </div>
      <ButtonsCategories categories={ mealsCategories } />
      <Recipes />
      <Footer />
    </div>
  );
}
const mapStateToProps = (state) => ({
  recipesMeals: state.reducerFetch.recipesMeals,
  first: state.reducerFetch.hand,
  nome: state.reducerFetch.name,
  mealsCategories: state.reducerFetch.buttonsCategorieMeals,
});
const mapDispatchToProps = (dispatch) => ({
  requiredFetchMealsRecipe: (recipes) => dispatch(fetchMealsRecipes(recipes)),
  requiredFetchMealsCategories: (cate) => dispatch(requiredCategorieMeals(cate)),
  redquiredTypeButton: (type) => dispatch(requiredTypeButtonClick(type)),
  typePageS: (page) => dispatch(typePageSelect(page)),
});
MealsRecipes.propTypes = {
  requiredFetchMealsRecipe: func,
}.isrequired;

export default connect(mapStateToProps, mapDispatchToProps)(MealsRecipes);
