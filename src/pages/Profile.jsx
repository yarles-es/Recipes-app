import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import { getUserLocalStorage } from '../localStorageFunctions/functionsGetLocalStorage';
import './Profile.css';

export default class Profile extends Component {
  state = { email: '' };

  componentDidMount() {
    const email = getUserLocalStorage();
    this.setState({ email });
  }

  clearAndRedirect = () => {
    const { history } = this.props;
    localStorage.clear();
    history.push('/');
  };

  render() {
    const { email } = this.state;
    const { history } = this.props;

    return (
      <div>
        <Header titlePage="Profile" iconProfile />
        <div className="info-profile" data-testid="profile-email">
          <p><strong>Email: </strong>{ email && email.email }</p>
        </div>
        <div className="buttons-profile">
          <button
            className="button-profile"
            data-testid="profile-done-btn"
            type="button"
            onClick={ () => {
              history.push('/done-recipes');
            } }
          >
            Done Recipes
          </button>
          <button
            className="button-profile"
            data-testid="profile-favorite-btn"
            type="button"
            onClick={ () => {
              history.push('/favorite-recipes');
            } }
          >
            Favorite Recipes
          </button>
        </div>
        <div className="container-button-logout">
          <button
              className="button-profile"
              data-testid="profile-logout-btn"
              type="button"
              onClick={ this.clearAndRedirect }
            >
              Logout
            </button>
        </div>
      </div>
    );
  }
}
Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
