import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import RevenueOfDrinks from '../components/RevenueOfDrinks';
import RevenueOfMeals from '../components/RevenueOfMeals';
import { requestDrinkDetail, requestMealDetail } from '../services/recipesDetailsAPI';

function RecipeInProgress() {
  const history = useHistory();
  const [revenues, setRevenues] = useState([]);
  const infoData = history.location.pathname.split('/');

  async function dateOfRevenue(func, id, chave) {
    const revenuesOfApi = await func(id);
    setRevenues(revenuesOfApi[chave]);
  }

  useEffect(() => {
    if (infoData[1] === 'meals') {
      dateOfRevenue(requestMealDetail, infoData[2], 'meals');
    }
    if (infoData[1] === 'drinks') {
      dateOfRevenue(requestDrinkDetail, infoData[2], 'drinks');
    }
  }, [setRevenues, history]);

  return (
    <div>
      {revenues.length > 0 && (
        <div>
          { infoData[1] === 'meals' && (<RevenueOfMeals meals={ revenues } />)}
          { infoData[1] === 'drinks' && (<RevenueOfDrinks drinks={ revenues } />)}
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  categorie: state.reducerFetch.pageSelected,
});

export default connect(mapStateToProps)(RecipeInProgress);
