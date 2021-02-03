# This is the Code Base for the Moderna Web App Code repository.

## Node version

This project uses node 14.15.4.

## Before you PR.

Push up your branch and review the differences like you'd be reviewing someone elses pull request. I often find that I catch a few extra things when looking it over in the bitbucket diffs.

Test your work with a screen reader. I usually just use Mac Voiceover.

To use VoiceOver: https://www.youtube.com/watch?v=5R-6WvAihms

Also check that your work is keyboard accessible. See if you can tab + enter through each page.

## Code Styles.

For this repo I'd like it to try to be more declarative than imperative. That is, the idea we can abstract complicated or long blocks for imperative code in shorter and easier to understand functions.

Long term this makes the code more readable and easier to understand. While not as "DRY" the gains to readability and making it easier for other developers to understand your code makes it worth it.

Check out: https://medium.com/dev-genius/from-imperative-to-declarative-javascript-f6bd8eec05bd for examples

## Typescript

To enable prettier with typescript go to your IDE settings and add:

```
"[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
```

replace with your own IDE's prettier

## Setup

To install dependencies use

npm install

## Scripts

Run the development server:

```
  npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Run the build:

```
npm run build
```

Start the production build once you've built

```
npm run start
```

## Storybook

This project uses React storybook for component documentation.
Click events should be registered using storybook/addon-actions.
Instead of using knobs in Storybook we are using the recently released controls.
Have a look here for referencing them:

https://storybook.js.org/docs/react/essentials/controls

### Localization

The project is localized using [React International](https://formatjs.io/docs/getting-started/installation/).

Localization logic is handled in the `LocalizationProvider`.

When adding and removing locales, you need to modify locale files in `./src/i18n/messages/`.

### Environment

Copy the `.env.example` files:

    cp .env.example .env
    cp ./backend/.env.example ./backend/.env

Modify any relevant environment variables.

## Unit tests

Test Coverage for the Repo should ideally be at least 70%.

Run the unit tests:

    npm test

Test for coverage using

    npm run test:coverage

To view test coverage file

    open ./coverage/lcov-report/index.html

### Testing Guildlines

#### What to test?

Generally we want to test our application/components that resemble how our user would use them.

We're less concerned with testing that specific text appears/implementation details and more about behaviours.

This can include user-actions like testing what happens when the user clicks a button, or enters some text into a form. It can also include things like conditional rendering. What happens if different props are passed to a component?

For more information on this read: https://kentcdodds.com/blog/how-to-know-what-to-test

and https://kentcdodds.com/blog/testing-implementation-details

For General testing tips check out: https://kentcdodds.com/blog/common-mistakes-with-react-testing-library

#### Which queries to use.

getByTestId should be the last resort/escape-hatch for when none of the other queries that testing-library provides applies.

Please read: https://testing-library.com/docs/queries/about/.

For a sort of heirarchy of queries and when to use them.

## Integration tests

Ideally we will build and maintain container level tests from the beginning as the application grows. See `./pages/__tests__/examplePage.test.tsx` for an example of testing containers with Redux/API Calls.

Unfortunately I can't put test folders inside the main pages folder so page container tests should be found at
`./src/tests/`

## Redux

This project intends to use Redux for -local- global state only. The idea is that server state should be handled by React-query and that our backend or server should always be the single source of truth for API Data.

Files for redux can be found int `./src/redux/`

## React-Query

This project uses React-Query to handle server state.

Preferably React-Query hooks should be kept in `./src/services` as they are related to API Data. See example inside.

For more information on React-Query: https://react-query.tanstack.com/

A good tutorial video to watch is: https://www.youtube.com/watch?v=DocXo3gqGdI&t=6s Although React-Query V3 has come out since then the syntax has only changed slightly and the same principles still apply.

## Theming

This project uses styled-components for theming.

To be implemented: The theme for the project is imported from the Component Library. It should be customizable before being exported and passed into the theme.

All Components built should be themed using the theme colors/typescale/type-weight/spacing etc.

## Folder Architecture and Purpose

### Below is a list of folders with their intentions.

`./pages/` - This folder houses the pages. The name of the page file is linked to it's routing. For example `./pages/examplePage.tsx` is for the route `/examplePage`. These pages are intended to be used at container components where all API calls/redux dispatches + state selectors/smart logic should go.

For more information on this architecture see: https://gist.github.com/chantastic/fc9e3853464dffdb1e3c for a good example.

`./src/pages/` - This is the folder where our page components should go. These would consume all the "smart" logic from the containers in the file path above. For an example see `./src/pages/ExamplePage/`. Ideally these would be presentational layout components used for things like creating spacing between sections or aligning things with flexbox/grids.

`./src/pages/Page/components` - This is where I'd like all the meat of the pages to be. This is where we could consume re-usable components. Build sublayouts for sections. Render API/Redux/Content data. (TBD: Unless we use the Contentful mapping strategy for building pages then this section is completely moot.). See `./src/pages/ExamplePage/components` For an example.

`./src/i18n` - This is where the LocalizationProvider lives as well as all the translation files.

`./src/components/` - These are where all our components will live. Ideally re-usable or components that are specific to this project that don't warrant being in the Component Library.

`./src/contexts/` - This is where any additionally defined Contexts using the React Context API will go.

`./src/services` - This is where anything having to do with API/API Calls/Contentful/API Services will go. For example things pertaining to Contentful clients/config, auth0 etc.

`./src/tests/` - This is the folder for integration and page level tests. Unfortunately I can't put them in the same folder as the top level pages because that folder is used for routing. Here we can test containers in their entirety making sure things like API calls/Redux/Other container elements are working properly.

`./src/test-helpers/` - Where any additional test-helpers will go. This includes any mocks for service workers/window objects/test-data etc.

`./src/theme/` - Where all files pertaining to the theme go as well as the Globalstyles.

`./src/utils/` - Any utility functions that can't categorized anywhere else belong here. Ideally re-usable functions that can be re-used across the project.

## Code Generation

This tool uses [Plop](https://plopjs.com/documentation), is a "micro-generator framework". Helps saving time and keep the code and structure like above.

See the `plopfile.js` for details about the available generators. All templates are created under `src/codegen/`. Please feel free to update as needed.

#### Available Generators

Generate one of the following:

- `component`
- `styled-component`
- `next-page`
- `util`
- `hook`
- `redux`

#### Usage

Running the following command will allow you to explore the available generators.

```
npm run plop
```

You can choose what you'd like to generate from the CLI:

```
npm run plop component
npm run plop styled-component
...etc
```