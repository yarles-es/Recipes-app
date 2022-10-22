import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import GG from './helpers/GG';
import renderWithRouterAndRedux from './helpers/rendeWithRouterAndRedux';

const mockFetch = (data) => Promise.resolve({
  json: () => Promise.resolve(data),
});

const flushPromises = () => new Promise((r) => { setTimeout(r); });
beforeEach(() => {
  const mockMultFetch = jest.fn()
    .mockReturnValueOnce(mockFetch(GG));
  global.fetch = mockMultFetch;
});
const mockFavorites = 'inProgressRecipes';
const listFavorites = [{
  id: '15997',
  recipesFinish: [],
}];
const setLocalStorage = (id, data) => {
  window.localStorage.setItem(id, JSON.stringify(data));
};
describe('Drinks improgress ingredients', () => {
  test('Ingredients', async () => {
    await flushPromises();
    localStorage.removeItem(mockFavorites);
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('drinks/15997/in-progress');

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    setLocalStorage(mockFavorites, listFavorites);
    expect(localStorage.getItem(mockFavorites)).toEqual(JSON.stringify(listFavorites));
    const recipe = screen.getByTestId('recipe-category');
    expect(recipe).toBeInTheDocument();
    const step1 = screen.getByTestId('0-step');
    expect(step1).toBeInTheDocument();
    const label = screen.getByTestId('0-ingredient-step');
    expect(label).toBeInTheDocument();
    const share = screen.getByTestId('share-btn');
    expect(share).toBeInTheDocument();
    window.document.execCommand = jest.fn().mockImplementation(() => ' ');
    userEvent.click(share);
    const linkCopied = screen.getByText('Link copied!');
    expect(linkCopied).toBeInTheDocument();

    global.fetch.mockClear();
  });
});
