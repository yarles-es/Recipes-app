import { string } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handCh } from '../redux/actions/action';

class SearchBar extends Component {
  state = {
    first: '',
  };

  handleChange = ({ target }) => {
    const { id } = target;
    this.setState({
      first: id,
    }, () => {
      const { first } = this.state;
      const { dispatch } = this.props;
      dispatch(handCh(first));
    });
  };

  render() {
    const { first } = this.state;
    const { click } = this.props;
    return (
      <div >
        <div
          className="container-filter-header"
          onChange={ this.handleChange } name="filter"
        >
          <label htmlFor="Ingredient">
            <input
              className="filter-header"
              type="radio"
              id="Ingredient"
              name="filter"
              value={ first }
              data-testid="ingredient-search-radio"
            />
            Ingredient
          </label>
          <label htmlFor="Name">
            <input
              className="filter-header"
              type="radio"
              id="Name"
              name="filter"
              value={ first }
              data-testid="name-search-radio"
            />
            Name
          </label>
          <label htmlFor="First letter">
            <input
              className="filter-header"
              type="radio"
              id="First letter"
              name="filter"
              value={ first }
              data-testid="first-letter-search-radio"
            />
            First letter
          </label>
        </div>
        <button
          className="button-search-bar"
          type="button"
          data-testid="exec-search-btn"
          onClick={ click }
        >
          Search
        </button>
      </div>
    );
  }
}

SearchBar.propTypes = {
  titlePage: string,
}.isRequired;

export default connect()(SearchBar);
