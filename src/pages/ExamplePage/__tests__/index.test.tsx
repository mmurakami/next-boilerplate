import React from 'react';
import userEvent from '@testing-library/user-event';

import { screen } from '@testing-library/react';
import { renderBaseProviders } from '../../../test-helpers/testUtils';
import { ExamplePage } from '../index';

const setLocale = jest.fn();
const setNewState = jest.fn();

const props = {
  pokemonName: 'pikachu',
  currentReduxValue: 'test',
  currentLocale: 'en-CA',
  setLocale,
  setNewState,
};

// This is probably the most idiomatic way i'd test. We make use getByRole for a11y confirmation and test what the mock functions were called with, and how many times they were fired

describe('<ExamplePage>', () => {
  it('renders', () => {
    renderBaseProviders(<ExamplePage {...props} />);

    const reduxButton = screen.getByRole('button', {
      name: /Set a new Redux value!/i,
    });
    userEvent.click(reduxButton);

    expect(setNewState).toHaveBeenCalledTimes(1);
    expect(setNewState).toHaveBeenCalledWith('new state');

    const setUSA = screen.getByRole('button', {
      name: /Set USA/i,
    });

    userEvent.click(setUSA);

    expect(setLocale).toHaveBeenCalledTimes(1);
    expect(setLocale).toHaveBeenCalledWith('en-US');

    const setCanadian = screen.getByRole('button', {
      name: /Set Canadian/i,
    });

    userEvent.click(setCanadian);

    expect(setLocale).toHaveBeenCalledTimes(2);
    expect(setLocale).toHaveBeenCalledWith('en-CA');

    const setFrench = screen.getByRole('button', {
      name: /Set French/i,
    });

    userEvent.click(setFrench);

    expect(setLocale).toHaveBeenCalledTimes(3);
    expect(setLocale).toHaveBeenCalledWith('fr-CA');
  });
});
