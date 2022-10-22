import { string } from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';

function CardRecipes({ name, image, indice, id, pageSelected }) {
  return (

    <li className="recipe-card" data-testid={ `${indice}-recipe-card` }>
      <Link className="link-cardRecipe"  to={ `/${pageSelected}/${id}` }>
        <img
          data-testid={ `${indice}-card-img` }
          className="recipe-image"
          src={ image }
          alt={ name }
        />
        <p data-testid={ `${indice}-card-name` }>{ name }</p>
      </Link>
    </li>
  );
}

const mapStateToProps = (state) => ({
  pageSelected: state.reducerFetch.pageSelected,
});

CardRecipes.propTypes = {
  name: string,
  image: string,
}.isrequired;

export default connect(mapStateToProps, null)(CardRecipes);
