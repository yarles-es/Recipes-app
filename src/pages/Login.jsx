import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  setUserLocalStorage,
  setMealsTokenLocalStorage,
  setDrinksTokenLocalStorage,
} from '../localStorageFunctions/functionsSetLocalStorage';
import iconAppRecipes from '../images/logoRecipeApp.png';
import './Login.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class Login extends Component {
  state = {
    email: '',
    senha: '',
    isDisabled: true,
  };

  validatePassword = () => {
    const { senha, email } = this.state;
    const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const numSenha = 7;
    if (senha.length >= numSenha && email.match(validateEmail)) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.validatePassword();
    });
  };

  submitLocale = () => {
    const { email } = this.state;
    const { history } = this.props;
    const user = {
      email,
    };
    const mealsToken = 1;
    const drinksToken = 1;
    setUserLocalStorage(user);
    setMealsTokenLocalStorage(mealsToken);
    setDrinksTokenLocalStorage(drinksToken);
    history.push('/meals');
  };

  render() {
    const { senha, email, isDisabled } = this.state;
    return (
      <div className="container-login">
        <img className="icone-login" src={ iconAppRecipes } alt="Icon APP Recipes" />
        <Form.Control
          className="input-login"
          type="email"
          required
          data-testid="email-input"
          placeholder="Email"
          name="email"
          onChange={ this.handleChange }
          value={ email }
        />
        <Form.Control
          className="input-login"
          type="password"
          data-testid="password-input"
          placeholder="Password"
          name="senha"
          onChange={ this.handleChange }
          value={ senha }
        />
        <Button
          className="button-login"
          variant="dark"
          type="button"
          data-testid="login-submit-btn"
          onClick={ this.submitLocale }
          disabled={ isDisabled }
        >
          <strong>LOGIN</strong>
        </Button>

      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
