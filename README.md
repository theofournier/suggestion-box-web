# Automation Acceleration Action
## Suggestion Box

Each ALJ’s employee has some task s.he is doing on a daily basis, therefore reducing their BAU or Project efficiency. The need to target and prioritize which tasks should be on the automation team scope and therefore increase ALJ employees efficiency grows everyday as the company scale up. We are proposing a solution to this issue with the Idea Logger Project.
1. Propose an interface allowing ALJ employees to submit ideas/products/ways of improving their daily work
2. Propose an interface allowing Administrator to review/edit the ideas and easily export them
3. Send reminder to the idea submitter informing her/him of the state of the idea

This front-end is related with the Automation Acceleration Action project and connecting to Automation Acceleration Action API.
It is developed in ReactJS with Material UI.


## Table of Contents

- [How to install](#how-to-install)
- [Run the code](#run-the-code)
- [Folder Structure](#folder-structure)
- [Pages and Features](#pages-and-features)
- [Libraries: used and explanations](#libraries)

## How to install

To launch the project you will need the following in your AXA PC :

- Install [GIT](https://confluence.axa.com/confluence/display/ALJ/Installing+Git+on+Axa+laptop)
- Install [NodeJs](https://confluence.axa.com/confluence/display/ALJ/nodejs)
- Install [VS Code](https://confluence.axa.com/confluence/display/ALJ/VS+code)
- Prerequisite to clone the repository, setup a [personal access token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/) in your [AXA GitHub profile](https://github.axa.com/settings/tokens).
- Create a .env file with your variables like in [.env.example](./.env.example) file.
- Clone and run the API repository: [automation-acceleration-action-api](https://github.axa.com/aljdevops/automation-acceleration-action-api)

## Run the code

In the project directory, you can run the following scripts:

### Install the dependencies

`npm install`

Install all the dependencies in the package.json and create a `node_modules/` folder.

### Run the server

`npm start`

Runs the react project and the express server in the file server.js.

## Folder Structure

The project structure look like this:

```
automation-acceleration-action/
  README.md
  node_modules/
  public/
  src/
    actions/ --> Script js used for the actions with Redux
      authActions.js --> Function call for authentication part
      types.js --> Const actions types used for Redux
    components/
      admin/ --> The components used in the admin table page
      auth/ --> The components used in the login page
      elements/ --> Small components used as utils for the app
      layout/ --> The components used for header, landing and not found pages
      suggestion/ --> The components used in the suggestion page
      suggestionList/ --> The components used in the suggestion list page
        suggestionItem/ --> The components used for suggestion item in the suggestion list
      suggestionPost/ --> The components used in the suggestion post page
      structures/ --> main components of the application
        Routing --> Routes of the app and loading of the icons in the library 
    images/
    actions/ --> Script js for Redux
      authReducers.js --> Reducer for authentication part
      index.js --> Combine reducer
    translations/ --> json files used for the ja and en translations
    utils/ --> specific utils in the app
    App.js --> render the differents routes Provide the react contexts to the app (Intl for languages and Redux for store)
    index.js --> Render <App /> component
    store.js --> Redux context
  package.json --> dependencies and scripts
  server.js --> Express server to serve the app, execute functions from 
```

## Pages and Features

### New suggestion

Any user can post a new suggestion.
He have to fill some information:

- Category: he have to choose between Efficiency, Speed Market, Quality or put is own category
- Description: he have to write a title and a description of his suggestion
- More Information: he may write the tool or process targeted, the number of person day current and future and the estimated cost of the idea
- Contact: he have to put his name, email and team.

Then a confirmation page appears and he can send the suggestion.
He receive a confirmation email.

### Login

Only for admin. An admin can log in to the platform to access to the admin panel. He have to put his id and password. Then the backend send a token which expires after 24 hours.

### Admin table

All suggestions are displayed through a table. There is possibilities to sort the data and search.

The admin can edit 3 fields for approval status:

- Gateway Status: 4 options, Submitted, Tier 1, Tier 2, Tier 3.
- Approval Status: 4 options, To Review, Reviewing, Approved, Rejected
- Remark

Each time a suggestion is edited, an email is sent to the user who post the suggestion, and an history of the modification is saved with timestamp.

### Admin List

All suggestions are displayed through a list. There is possibilities to sort the data and search.

The admin can edit a suggestion like in the table.

On click, the admin can access to the suggestion page and more information like the history.


## Libraries: used and explanations

### Redux

A complimentary library to React that provides a way to easily keep the data(State) and the events(Actions).Redux isolate state object from components. Redux allows us to build React app as you are but delegate all the State and Actions to Redux, With redux we can isolate store having state so all components can talk to it get required state object from it.

### Axios

A library to do HTTP request. We use it to request the API.

### Jwt-decodes

The API send to the Webapp a token encrypt by this library. We use it to decrypt it.

### Material-UI

A library which contains reusable component as Inputs and Button

### Material-table

A library used to render tables easily.

### Moment

A library to manipulate date and time easily.
