# Firstleaf Take Home Project

## Intro
Today, we're going to construct a country of the world app!  This assignment allows you to demonstrate your experience with ReactJS and CSS.

## Assignment
Given a data API located here: https://restcountries.eu/#api-endpoints-all.  Build an app in ReactJS that meets the requirements below.

## Requirements
- displays a list of the countries using a component CountryCard for display
- allows you to click the country card, and display the countries' profile ("region, capital city and population (and any other extra info you'd like to add)")
- allows you to search for a specific country by name

Use: https://restcountries.eu/rest/v2/name/{name}  ({name being the country name}) for searching the name
Use: https://restcountries.eu/rest/v2/all to get all the countries

## Extra
- What does code quality look like to you? Show us with your code!  If you have an eye for design, impress us with your CSS powers!

## Let's Get Started:
1. Clone this repository 
2. If you don't have node installed download it here: https://nodejs.org/en/
3. Go to the root directory of the repository in your command line and run npm i or npm install
4. Run npm start, and it should load a basic rendered page in your default browser
5. You're ready to code!

# Personal considerations

The final version of the app was deployed to netlify and can be previewed [here](https://first-leaf-challenge.netlify.app/)


## requirements
 - node v12.0.0 >
 - yarn v1.22.0 >
 - docker (optional)

## Getting Started

First, run the development server:

```bash
yarn start
# or
docker-compose up --build
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Stack used

- Create-react-app / React (as provided)
- Redux
- jest
- react-testing-library (RTL)
- emotion (css-in-js lib)
- eslint / prettier
- travis CICD
- netlify (deployments and PR previews)
- docker (optional)

## Project assets


### Coverage
![image](https://user-images.githubusercontent.com/13686332/115161988-1f343680-a077-11eb-8227-ce0b3cf53d8b.png)

### Desktop version
![image](https://user-images.githubusercontent.com/13686332/114761696-3ac9d500-9d37-11eb-9a0b-6ff61b6bd49c.png)
![image](https://user-images.githubusercontent.com/13686332/114761708-40271f80-9d37-11eb-9292-ab019ddeaea9.png)

### Mobile version
![image](https://user-images.githubusercontent.com/13686332/114785269-d6b50a00-9d52-11eb-8899-4ee994989967.png)
![image](https://user-images.githubusercontent.com/13686332/114785282-dd438180-9d52-11eb-9d0e-a6aa474b01d2.png)

Usage on actual device (also fixing auto zoom from ios)
![image](https://user-images.githubusercontent.com/13686332/114785884-ad48ae00-9d53-11eb-8984-86751fb4b08c.png)

### loader
![image](https://user-images.githubusercontent.com/13686332/114813368-5c06e180-9d88-11eb-9b16-f8dce4cb38cf.png)

### error
![image](https://user-images.githubusercontent.com/13686332/114813394-65904980-9d88-11eb-9a86-cea1f5b579f1.png)