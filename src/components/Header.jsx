import { func } from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.png';
import searchIcon from '../images/searchIcon.png';
import drinkIcon from '../images/drinkIcon.png';
import mealIcon from '../images/mealIcon.png';
import profile from '../images/profileIcon.png';
import { requiretName } from '../redux/actions/action';
import SearchBar from './SearchBar';
import './Header.css';
import iconHeader from '../images/IconeHeader.png';
import Form from 'react-bootstrap/Form';

function Header({
  search,
  titlePage,
  iconProfile,
  iconSearch,
  name,
  requiret,
  click,
}) {
  const [visibleSearch, setVisibleSearch] = useState(false);
  const setSearch = () => {
    setVisibleSearch(!visibleSearch);
  };

  const handChange = ({ target }) => {
    requiret(target.value);
  };

  const selectIcon = () => {
    switch (titlePage) {
      case 'Drinks': return drinkIcon;
      case 'Meals': return mealIcon;
      case 'Profile': return profile;
      default: return undefined;
    }
  }

  return (
    <section className="container-header">
      <div className="container-icons">
        <img className="img-header" src={iconHeader} alt="Icon Header" />
        <p className="title-header"><em>RECIPES</em> <strong>app</strong></p>
        <div>
          {iconProfile && (
            <Link to="/profile">
              <button 
                type="button"
                className="buttons-header"
              >
                <img
                  className="icons-header"
                  data-testid="profile-top-btn"
                  src={ profileIcon }
                  alt="Profile Icon"
                />
              </button>
            </Link>
          )}
          {iconSearch && (
            <button
              className="buttons-header"
              data-testid="set-search"
              type="button"
              onClick={ setSearch }
            >
              <img
                className="icons-header"
                data-testid="search-top-btn"
                src={ searchIcon }
                alt="Search Icon"
              />
            </button>
          )}
        </div>
      </div>
      <img className="img-title" src={ selectIcon() } alt="icone" />
      <h1 className="titleHeader" data-testid="page-title"><strong>{ titlePage }</strong></h1>
      <div className="container-header-input-filters">
        {visibleSearch && <Form.Control
          className="input-header"
          data-testid="search-input"
          placeholder="Search"
          type="text"
          value={ name }
          onChange={ handChange }
        />}
        {visibleSearch && search ? <SearchBar click={ click } /> : null }
      </div>
    </section>
  );
}

const mapStateToProps = (state) => ({
  name: state.reducerFetch.name,
});
const mapDispatchToProps = (dispatch) => ({
  requiret: (name) => dispatch(requiretName(name)),
});
Header.propTypes = {
  requiredFetchMealsRecipe: func,
}.isrequired;
export default connect(mapStateToProps, mapDispatchToProps)(Header);
