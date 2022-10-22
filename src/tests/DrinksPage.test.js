import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import DrinksPage from '../pages/DrinksPage';
import drinks from './helpers/drinks';
import renderWithRouterAndRedux from './helpers/rendeWithRouterAndRedux';

describe('Testando componente Drinks', () => {
  const alertMock = jest.spyOn(window, 'alert').mockImplementation();
  const mockFetch = () => Promise.resolve({
    json: () => Promise.resolve(drinks),
  });
  const rice = 'rice';
  const ingredient = 'ingredient-search-radio';
  const name = 'name-search-radio';
  const first = 'first-letter-search-radio';
  const serch = 'search-input';
  const set = 'set-search';
  const exet = 'exec-search-btn';
  const card0 = '0-card-name';
  test('DrinksPage page', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
    renderWithRouterAndRedux(<DrinksPage />);
    const butoSet = screen.getByTestId(set);
    expect(butoSet).toBeInTheDocument();
    expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(screen.getByTestId('search-top-btn')).toBeInTheDocument();
    expect(screen.getByTestId('ingredient-search-radio')).toBeInTheDocument();
    userEvent.click(butoSet);

    const input = screen.getByTestId('search-input');
    expect(input).toBeInTheDocument();
    userEvent.type(input, rice);

    expect(input).toHaveValue(rice);
    const ingredientBTN = screen.getByTestId(ingredient);
    expect(ingredientBTN).toBeInTheDocument();
    userEvent.click(ingredientBTN);

    const exet1 = screen.getByTestId(exet);
    userEvent.click(exet1);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const card = screen.getByTestId('0-recipe-card');
    expect(card).toBeInTheDocument();

    expect(input).toHaveValue(rice);
    const NameBTN1 = screen.getByTestId(name);
    userEvent.click(NameBTN1);

    userEvent.click(exet1);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const nameCard = screen.getByTestId(card0);
    expect(nameCard).toBeInTheDocument();

    const btnFooter = screen.getByTestId('drinks-bottom-btn');
    expect(btnFooter).toBeInTheDocument();
    userEvent.click(btnFooter);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(nameCard).toBeInTheDocument();

    expect(input).toHaveValue(rice);
    const NameBTN2 = screen.getByTestId(first);
    userEvent.click(NameBTN2);
    userEvent.click(exet1);
    expect(alertMock).toHaveBeenCalledTimes(2);
    global.fetch.mockClear();
  });
  test('Test first com a letra "a"', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
    renderWithRouterAndRedux(<DrinksPage />);
    const butoSet = screen.getByTestId(set);
    expect(butoSet).toBeInTheDocument();
    userEvent.click(butoSet);
    const input = screen.getByTestId(serch);
    expect(input).toBeInTheDocument();
    userEvent.type(input, 'r');
    const NameBTN2 = screen.getByTestId(first);
    userEvent.click(NameBTN2);

    const exet2 = screen.getByTestId(exet);
    userEvent.click(exet2);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const nameCard = screen.getByTestId('0-card-name');
    expect(nameCard).toBeInTheDocument();
    global.fetch.mockClear();
  });
});
