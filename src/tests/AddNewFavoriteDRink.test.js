import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import Acid from './helpers/Acid';
import renderWithRouterAndRedux from './helpers/rendeWithRouterAndRedux';

const mockFetch = (data) => Promise.resolve({
  json: () => Promise.resolve(data),
});

const flushPromises = () => new Promise((r) => { setTimeout(r); });

describe('Testand details Drinks', () => {
  beforeEach(() => {
    const mockMultFetch = jest.fn()
      .mockReturnValueOnce(mockFetch(Acid));
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
  setLocalStorage(mockFavorites, listFavorites);
  test('Drinks details', async () => {
    await flushPromises();
    expect(localStorage.getItem(mockFavorites)).toEqual(JSON.stringify(listFavorites));
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/drinks/14610/in-progress');

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(screen.getByText('Shot glass')).toBeInTheDocument();

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
    setLocalStorage(mockFavorites, listFavorites1);
    expect(localStorage.getItem(mockFavorites)).toEqual(JSON.stringify(listFavorites1));

    global.fetch.mockClear();
  });
});
