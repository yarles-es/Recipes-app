import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import meals from './helpers/meals';
import renderWithRouterAndRedux from './helpers/rendeWithRouterAndRedux';

const mockFetch = () => Promise.resolve({
  json: () => Promise.resolve(meals),
});
const flushPromises = () => new Promise((r) => { setTimeout(r); });
const setLocalStorage = (id, data) => {
  window.localStorage.setItem(id, JSON.stringify(data));
};
describe('Testing Profiles', () => {
  const mockId = 'user';
  const mockJson = { email: 'reinaldoper83@gamail.com' };
  setLocalStorage(mockId, mockJson);
  test('Favorites list buttons and direction page done recipes.', async () => {
    await flushPromises();
    expect(localStorage.getItem(mockId)).toEqual(JSON.stringify(mockJson));
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/profile');
    const mail = screen.getByTestId('profile-email');
    expect(mail).toBeInTheDocument();
    setLocalStorage(mockId, mockJson);
    expect(localStorage.getItem(mockId)).toEqual(JSON.stringify(mockJson));
    const nomeEmail = screen.getByText('reinaldoper83@gamail.com');
    expect(nomeEmail).toBeInTheDocument();
    global.fetch.mockClear();
  });
});
