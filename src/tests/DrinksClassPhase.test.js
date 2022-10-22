import { fireEvent, screen, waitFor } from '@testing-library/react';
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
  recipesFinish: ['Galliano', 'Ginger ale', 'Ice'],
}];
const setLocalStorage = (id, data) => {
  window.localStorage.setItem(id, JSON.stringify(data));
};
setLocalStorage(mockFavorites, listFavorites);
describe('Meals ingredients', () => {
  const finisClass = 'finish phrase-content';

  test('Ingredients', async () => {
    await flushPromises();
    expect(localStorage.getItem(mockFavorites)).toEqual(JSON.stringify(listFavorites));
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('drinks/15997/in-progress');

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    const recipe = screen.getByTestId('recipe-category');
    expect(recipe).toBeInTheDocument();
    const step1 = screen.getByTestId('0-step');
    const label = screen.getByTestId('0-ingredient-step');

    expect(label).toHaveClass(finisClass, { exact: true });
    expect(label).toHaveClass(finisClass);
    expect(step1).toBeInTheDocument();
    fireEvent.click(step1);
    expect(label).not.toHaveClass(finisClass, { exact: true });
    global.fetch.mockClear();
  });
});
