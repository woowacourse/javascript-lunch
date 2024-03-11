// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import { Category, WalkingTime } from '../../src/interface/Restaurant';
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

export interface RestaurantData {
  category: Category;
  name: string;
  walkingTime: WalkingTime;
}

export interface TestData {
  input: RestaurantData[];
  output: RestaurantData[];
}

export interface filterTestDate {
  input: { category: Category; filteredRestaurants: RestaurantData[] }[];
  output: RestaurantData[];
}

export const addition: TestData = {
  input: [
    {
      category: '중식',
      name: '친친',
      walkingTime: 5,
    },
  ],
  output: [
    {
      category: '중식',
      name: '친친',
      walkingTime: 5,
    },
  ],
};

export const sortingName: TestData = {
  input: [
    {
      category: '한식',
      name: '바',
      walkingTime: 5,
    },
    {
      category: '한식',
      name: '가',
      walkingTime: 5,
    },
    {
      category: '한식',
      name: '나',
      walkingTime: 5,
    },
    {
      category: '한식',
      name: '마녀김밥',
      walkingTime: 5,
    },
  ],
  output: [
    {
      category: '한식',
      name: '가',
      walkingTime: 5,
    },
    {
      category: '한식',
      name: '나',
      walkingTime: 5,
    },
    {
      category: '한식',
      name: '마녀김밥',
      walkingTime: 5,
    },
    {
      category: '한식',
      name: '바',
      walkingTime: 5,
    },
  ],
};

export const sortingWalkingTime: TestData = {
  input: [
    {
      category: '한식',
      name: '바',
      walkingTime: 30,
    },
    {
      category: '한식',
      name: '간',
      walkingTime: 5,
    },
    {
      category: '한식',
      name: '가',
      walkingTime: 5,
    },
    {
      category: '한식',
      name: '나',
      walkingTime: 20,
    },
    {
      category: '한식',
      name: '마녀김밥',
      walkingTime: 10,
    },
  ],
  output: [
    {
      category: '한식',
      name: '가',
      walkingTime: 5,
    },
    {
      category: '한식',
      name: '간',
      walkingTime: 5,
    },
    {
      category: '한식',
      name: '마녀김밥',
      walkingTime: 10,
    },
    {
      category: '한식',
      name: '나',
      walkingTime: 20,
    },
    {
      category: '한식',
      name: '바',
      walkingTime: 30,
    },
  ],
};

export const filterTests: filterTestDate = {
  input: [
    {
      category: '중식',
      filteredRestaurants: [
        {
          category: '중식',
          name: '가',
          walkingTime: 5,
        },
      ],
    },
    {
      category: '일식',
      filteredRestaurants: [
        {
          category: '일식',
          name: '바',
          walkingTime: 30,
        },
      ],
    },
    {
      category: '한식',
      filteredRestaurants: [
        {
          category: '한식',
          name: '마녀김밥',
          walkingTime: 10,
        },
        {
          category: '한식',
          name: '나',
          walkingTime: 20,
        },
      ],
    },
  ],
  output: [
    {
      category: '중식',
      name: '가',
      walkingTime: 5,
    },
    {
      category: '한식',
      name: '마녀김밥',
      walkingTime: 10,
    },
    {
      category: '한식',
      name: '나',
      walkingTime: 20,
    },
    {
      category: '일식',
      name: '바',
      walkingTime: 30,
    },
  ],
};
