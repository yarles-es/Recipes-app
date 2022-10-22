import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/rendeWithRouterAndRedux';

describe('Testand Favorite Meals', () => {
  const mockFavorites = 'doneRecipes';
  const listFavorites = [{
    alcoholicOrNot: '',
    id: '52977',
    type: 'meal',
    nationality: 'Turkish',
    category: 'Side',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  },
  ];
  test('Favorite recipe Meals', async () => {
    localStorage.removeItem(mockFavorites);
    localStorage.setItem(mockFavorites, JSON.stringify(listFavorites));
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/done-recipes');
    const btn = screen.getByTestId('filter-by-all-btn');
    expect(btn).toBeInTheDocument();
    userEvent.click(btn);
    await waitFor(() => {
      const share = screen.getByTestId('0-horizontal-share-btn');
      expect(share).toBeInTheDocument();
      expect(screen.getByTestId('0-horizontal-top-text')).toBeInTheDocument();
      expect(screen.getByTestId('0-horizontal-image')).toBeInTheDocument();
      expect(screen.getByTestId('0-horizontal-name')).toBeInTheDocument();

      window.document.execCommand = jest.fn().mockImplementation(() => ' ');
      userEvent.click(share);
      const linkCopied = screen.getByText('Link copied!');
      expect(linkCopied).toBeInTheDocument();
      localStorage.removeItem(mockFavorites);
    });
  });
});
