# Flash Cards Project

Flash Cards Project is the third challenge project of Udacity Nanodegree React Program.

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

## Test yourself

Follow these steps

* `git clone https://github.com/marquesm91/react-mobile-flashcards`
* `npm install` or `yarn`
* `npm run start` or `yarn start`
* `run application on iOS` (only iOS tested)

## Plataform Tests

|      Plataform    |       Tested ?      |
|:-----------------:|:-------------------:|
| Android Device    |                     |
| Android Simulator |                     |
| iOS Device        | :white_check_mark:  |
| iOS Simulator     | :white_check_mark:  |

## About the application

After the default installation with `create-react-native-app`, three 3rd party library was added:

* `dayjs` found [here](https://github.com/xx45/dayjs) was used to learn another date package and try something new insted `moment`.
* `react-native-animate-number` found [here](https://github.com/wkh237/react-native-animate-number) and used to Animate Value Numbers easily.
* `react-native-swiper` found [here](https://github.com/leecade/react-native-swiper) and used to sort array based on an key object.
* `react-navigation` was used to create all the app navigation.
* `redux` and `redux-thunk` was used to state management.

## What you can do

* You can add/delete a Deck.
* You can add new Cards to a Deck.
* You can start a Quiz.
* You can see the answers of each Card.
* You can go back or go further to take a look of all cards Deck.
* You can check your results at the end of the Quiz.

## Features

All features listed are a plus and not mentioned in challenge's specification.

* Delete a deck.
* View with total of correct answers (absolute and relative) and check again your individual results by card
* You can add multiple cards at the same screen. (You don't have to navigate back to do that)
* When you try to start a quiz with an empty deck, a view you warning you to Create a New Question