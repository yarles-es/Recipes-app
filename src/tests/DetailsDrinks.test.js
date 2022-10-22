import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import Acid from './helpers/Acid';
import meals from './helpers/meals';
import renderWithRouterAndRedux from './helpers/rendeWithRouterAndRedux';

const mockFetch = (data) => Promise.resolve({
  json: () => Promise.resolve(data),
});

const flushPromises = () => new Promise((r) => { setTimeout(r); });

describe('Testand details Drinks', () => {
  beforeEach(() => {
    const mockMultFetch = jest.fn()
      .mockReturnValueOnce(mockFetch(Acid))
      .mockReturnValueOnce(mockFetch(meals));
    global.fetch = mockMultFetch;
  });
  const setLocalStorage = (id, data) => {
    window.localStorage.setItem(id, JSON.stringify(data));
  };
  const mockFavorites = 'favoriteRecipes';
  const listFavorites1 = [{
    alcoholicOrNot: '',
    id: '52977',
    type: 'meal',
    nationality: 'Turkish',
    category: 'Side',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  },
  {
    alcoholicOrNot: 'Alcoholic',
    id: '14610',
    type: 'drink',
    name: 'ACID',
    category: 'Shot',
    nationality: '',
    image: 'https://www.thecocktaildb.com/images/media/drink/xuxpxt1479209317.jpg',
  }];
  const listFavorites = [{
    alcoholicOrNot: '',
    id: '52977',
    type: 'meal',
    nationality: 'Turkish',
    category: 'Side',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  }];
  const mockRecipes = 'doneRecipes';
  const listRecipes = [
    {
      alcoholicOrNot: 'Alcoholic',
      id: '14610',
      type: 'drink',
      name: 'ACID',
      category: 'Shot',
      nationality: '',
      image: 'https://www.thecocktaildb.com/images/media/drink/xuxpxt1479209317.jpg',
    }];
  setLocalStorage(mockFavorites, listFavorites);
  setLocalStorage(mockRecipes, listRecipes);
  test('Drinks details', async () => {
    await flushPromises();
    expect(localStorage.getItem(mockFavorites)).toEqual(JSON.stringify(listFavorites));
    expect(localStorage.getItem(mockRecipes)).toEqual(JSON.stringify(listRecipes));
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/drinks/14610');

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(screen.getByText('ACID')).toBeInTheDocument();

    const photo = screen.getByTestId('recipe-photo');
    expect(photo).toBeInTheDocument();
    const recomendation = screen.getByTestId('0-recommendation-card');
    expect(recomendation).toBeInTheDocument();
    const btnFavorite = screen.getByTestId('favorite-btn');
    expect(btnFavorite).toBeInTheDocument();
    const share = screen.getByTestId('share-btn');
    expect(share).toBeInTheDocument();
    window.document.execCommand = jest.fn().mockImplementation(() => ' ');
    userEvent.click(share);
    const linkCopied = screen.getByText('Link copied!');
    expect(linkCopied).toBeInTheDocument();
    userEvent.click(btnFavorite);
    localStorage.removeItem(mockFavorites);
    setLocalStorage(mockRecipes, listRecipes);
    expect(localStorage.getItem(mockRecipes)).toEqual(JSON.stringify(listRecipes));
    expect(screen.queryByText('Start Recipe')).not.toBeInTheDocument();
    setLocalStorage(mockFavorites, listFavorites1);
    expect(localStorage.getItem(mockFavorites)).toEqual(JSON.stringify(listFavorites1));

    global.fetch.mockClear();
  });
});
