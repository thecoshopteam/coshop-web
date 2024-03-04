import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import CSListItem from './CSList.jsx';

describe('handleAddItem function', () => {
  let localStorageMock;

  beforeEach(() => {
    localStorageMock = {
      getItem: jest.fn(() => null),
      setItem: jest.fn(),
    };
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should add a new item to the list and local storage', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<CSListItem />);

    const input = getByPlaceholderText('Enter item title');
    const addButton = getByText('Add Item');

    fireEvent.change(input, { target: { value: 'Peanut Butter' } });
    fireEvent.click(addButton);

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'items',
      JSON.stringify([{ id: 1, title: 'Peanut Butter', isBought: false }])
    );

    expect(queryByText('Peanut Butter')).toBeTruthy();
  });
});
