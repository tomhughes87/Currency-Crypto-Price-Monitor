# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# Know Issues:

AverageTickerValues:

- After a few minutes the websockets slowly begin to get this error:
  `AverageTickerValues.tsx:110 WebSocket connection to 'wss://api-pub.bitfinex.com/ws/2' failed: `

* This doesn't stop the functionality of the component

- CORS missing on BitStamp. Not sure what is happening. Sometimes there's no problems, other times there's no CORS.
  tried:
- - various headers (mode:no-cors/mode:cors/etc)
- -

### issues:

#### websocket:

- 3 websocket connects are established, each require research the sites documentation to understand the different channels, data structures, etc
- using websocket channel that returned data every 0.05secs, like on coinbase, cause performance issues, especially if the data was being set to a state in a specific way with nest if states.
  The fix: a websocket channel that sent every 5sec and only if changes had been made. Also changing from any changes to only 'Buy' changes so if statements could be removed
  tried: adding 'Sec-WebSocket-Extensions: permessage-deflate' to the websocket header but add no sucess

- data type: Typescripts strict data types made handling the various responses from each websocket easier. (some gave 'string', other 'number' )

- API fetch on BitStamp had a major CORS issue, the fix: try{} catch{}. If the fetch fails due to CORS issues, the catch waits (setTimeout()) for a few seconds before trying again. It could take up to four attempts or only one.

#### calling 'find average func:

- Trying to setSate for the Avg by calling an external func gave this err:

```
react-dom.development.js:18687 The above error occurred in the <AverageTickerValues> component:

    at AverageTickerValues (http://localhost:3000/static/js/bundle.js:32:96)
    at PageMain
    at RenderedRoute (http://localhost:3000/static/js/bundle.js:38264:5)
    at Routes (http://localhost:3000/static/js/bundle.js:38686:5)
    at Router (http://localhost:3000/static/js/bundle.js:38624:15)
    at BrowserRouter (http://localhost:3000/static/js/bundle.js:36956:5)

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries
```

Solution: use a vanilla 'let' var

###

import svg's:

```error:
Cannot find module './coinbase_logo.svg' or its corresponding type declarations.
```

solutions:

custom.d.ts with the following content:

declare module "\*.svg" {
const content: any;
export default content;
}

Add the custom.d.ts to tsconfig.json as below

"include": ["src/components", "src/custom.d.ts"]

### svg errors:

`` SyntaxError: unknown file: Namespace tags are not supported by default. React's JSX doesn't support namespace tags. You can set `throwIfNamespace: false` to bypass this warning. ``

In the SVG file, try changing:

`sketchType TO sketchType`
`xmlnsXlink TO xmlnsXlink`
`xlinkHref TO xlinkHref`
^this didnt work

https://jakearchibald.github.io/svgomg/
^using this site to reconfig the svg worked!
