import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import detailsMeals from './helpers/detailsMeals';
import drinks from './helpers/drinks';
import renderWithRouterAndRedux from './helpers/rendeWithRouterAndRedux';

const mockFetch = (data) => Promise.resolve({
  json: () => Promise.resolve(data),
});

const flushPromises = () => new Promise((r) => { setTimeout(r); });

describe('Testand details Meals', () => {
  beforeEach(() => {
    const mockMultFetch = jest.fn()
      .mockReturnValueOnce(mockFetch(detailsMeals))
      .mockReturnValueOnce(mockFetch(drinks));
    global.fetch = mockMultFetch;
  });
  const mockFavorites = 'favoriteRecipes';
  const listFavorites = [{
    id: '52844',
    name: 'Lasagne',
    image: 'https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg',
  }];
  const setLocalStorage = (id, data) => {
    window.localStorage.setItem(id, JSON.stringify(data));
  };
  setLocalStorage(mockFavorites, listFavorites);
  test('Meals details', async () => {
    await flushPromises();
    expect(localStorage.getItem(mockFavorites)).toEqual(JSON.stringify(listFavorites));
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/meals/52844');

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(screen.getByText('Lasagne')).toBeInTheDocument();

    const photo = screen.getByTestId('recipe-photo');
    expect(photo).toBeInTheDocument();
    const recomendation = screen.getByTestId('0-recommendation-card');
    expect(recomendation).toBeInTheDocument();
    const btnFavorite = screen.getByTestId('favorite-btn');
    expect(btnFavorite).toBeInTheDocument();
    userEvent.click(btnFavorite);
    setLocalStorage(mockFavorites, listFavorites);
    expect(localStorage.getItem(mockFavorites)).toEqual(JSON.stringify(listFavorites));

    global.fetch.mockClear();
  });
});
