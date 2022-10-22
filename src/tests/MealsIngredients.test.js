import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import Corba from './helpers/Corba';
import renderWithRouterAndRedux from './helpers/rendeWithRouterAndRedux';

const mockFetch = (data) => Promise.resolve({
  json: () => Promise.resolve(data),
});

const flushPromises = () => new Promise((r) => { setTimeout(r); });

describe('Meals ingredients', () => {
  beforeEach(() => {
    const mockMultFetch = jest.fn()
      .mockReturnValueOnce(mockFetch(Corba));
    global.fetch = mockMultFetch;
  });
  const phase = 'phrase-content';
  const finisClass = 'finish phrase-content';
  const setLocalStorage = (id, data) => {
    window.localStorage.setItem(id, JSON.stringify(data));
  };
  const mockFavorites = 'doneRecipes';
  const listFavorites = [{
    alcoholicOrNot: '',
    category: 'Side',
    doneDate: '07/09/2022',
    id: '52977',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    name: 'Corba',
    nationality: 'Turkish',
    type: 'meal',
  }];
  test('Ingredients', async () => {
    await flushPromises();
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('meals/52977/in-progress');
    console.log('log', localStorage.getItem(mockFavorites));
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(screen.getByText('Corba')).toBeInTheDocument();

    const recipe = screen.getByTestId('recipe-category');
    expect(recipe).toBeInTheDocument();
    const step1 = screen.getByTestId('0-step');
    const label = screen.getByTestId('0-ingredient-step');

    expect(label).toHaveClass(phase, { exact: true });
    expect(step1).toBeInTheDocument();
    const step2 = screen.getByTestId('1-step');
    const label1 = screen.getByTestId('1-ingredient-step');

    expect(label1).toHaveClass(phase, { exact: true });
    expect(step2).toBeInTheDocument();
    const step3 = screen.getByTestId('2-step');
    const label2 = screen.getByTestId('2-ingredient-step');

    expect(label2).toHaveClass(phase, { exact: true });
    expect(step3).toBeInTheDocument();
    const step4 = screen.getByTestId('3-step');
    expect(step4).toBeInTheDocument();
    const step5 = screen.getByTestId('4-step');
    expect(step5).toBeInTheDocument();
    const step6 = screen.getByTestId('5-step');
    expect(step6).toBeInTheDocument();
    const step7 = screen.getByTestId('6-step');
    expect(step7).toBeInTheDocument();
    const step8 = screen.getByTestId('7-step');
    expect(step8).toBeInTheDocument();
    const step9 = screen.getByTestId('8-step');
    expect(step9).toBeInTheDocument();
    const step10 = screen.getByTestId('9-step');
    expect(step10).toBeInTheDocument();
    const step11 = screen.getByTestId('10-step');
    expect(step11).toBeInTheDocument();
    const step12 = screen.getByTestId('11-step');
    expect(step12).toBeInTheDocument();
    const step13 = screen.getByTestId('12-step');
    expect(step13).toBeInTheDocument();
    fireEvent.click(step1);

    expect(label).toHaveClass(finisClass, { exact: true });
    fireEvent.click(step2);

    expect(label1).toHaveClass(finisClass, { exact: true });
    fireEvent.click(step3);

    fireEvent.click(step4);
    fireEvent.click(step5);
    fireEvent.click(step6);
    fireEvent.click(step7);
    fireEvent.click(step8);
    fireEvent.click(step9);
    fireEvent.click(step10);
    fireEvent.click(step11);
    fireEvent.click(step12);
    fireEvent.click(step13);
    const finish = screen.getByText('Finalizar a receita');
    expect(finish).toBeVisible();
    userEvent.click(finish);
    localStorage.removeItem(mockFavorites);
    expect(history.location.pathname).toEqual('/done-recipes');
    setLocalStorage(mockFavorites, listFavorites);
    expect(localStorage.getItem(mockFavorites)).toEqual(JSON.stringify(listFavorites));
    global.fetch.mockClear();
  });
});
