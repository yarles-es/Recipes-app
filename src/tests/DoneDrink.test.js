import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/rendeWithRouterAndRedux';

describe('Testand done drinks', () => {
  const mockFavorites = 'doneRecipes';
  const listFavorites = [{
    alcoholicOrNot: '',
    id: '14610',
    type: 'drink',
    category: 'Shot',
    doneDate: '05/09/2022',
    name: 'ACID',
    image: 'https://www.thecocktaildb.com/images/media/drink/xuxpxt1479209317.jpg',
  },
  ];
  test('Favorite done drinks', async () => {
    localStorage.removeItem(mockFavorites);
    localStorage.setItem(mockFavorites, JSON.stringify(listFavorites));
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/done-recipes');
    const btn = screen.getByTestId('filter-by-drink-btn');
    expect(btn).toBeInTheDocument();
    userEvent.click(btn);
    await waitFor(() => {
      const share = screen.queryAllByTestId('0-horizontal-share-btn');
      expect(share[0]).toBeInTheDocument();
      const date = screen.getByText('05/09/2022');
      expect(date).toBeInTheDocument();
      window.document.execCommand = jest.fn().mockImplementation(() => ' ');
      userEvent.click(share[0]);
      const linkCopied = screen.getByText('Link copied!');
      expect(linkCopied).toBeInTheDocument();
      localStorage.removeItem(mockFavorites);
    });
  });
});
