# Not a generic react readme, please scroll down

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

### on values change, animate the style:

- either: useEffects/ onChange/ firing a func from the websocket
- then changing the dom p tag and adding a new class
  ^ all seems a bit much for little reward

### fetch() err in useEffect (btn population)

-trying to fetch from `https://www.bitstamp.net/api/v2/trading-pairs-info/`,

- returns the data without any issues
- BUT error:
  ` Uncaught (in promise) TypeError: Failed to fetch`

- tried: async/await: no difference
- tried: adding to header (mode:cors, method:GET,etc): no difference
- tried: checkingthe url (Http/https, etc): no difference
- tried: a different url: it works err free with a different url "https://www.themealdb.com/api/json/v1/1/random.php"
  Conclusion: must be a server side issue, need to investigate further

### search features:

- start with (so typing "usd" would give "usd/btc" BUT NOT "btc/usd)
- includes (so typing "usd" would give "usd/btc" AND "btc/usd)
- default: all btns displayed, searching removes btns OR alternatively:
- - if the input is empty then no btns displayed

choice:

- I went with the default, to show all btns, it was closer to the design and is less effort for user
- startWith() felt more natural and much more useful to users
  Alt:
  -dropdown, this might work well too.

### Stats comp:

- Problem: the api links vary in speed and quality. BTC/USD is slower and often has Cors issues resulting in a failed fetch (serval others out of the 175 tickers are the same)
- Tried: using websocket instead to bypass CORS- changing websocket channels could be done I believe but it's not time efficent, also there are already several websockets running on the avgtickval component
- Tried: Reaching a proxy server to host the api data and add cors to my proxy server- seems like a heavy handed approach
- Temp solution:

### a very rare chance of failing to fetch btn api

- solution: try{} catch{setTimeout(), fetchAgain()}

# trello board started to track tasks:

- https://trello.com/invite/b/sqfWvc0x/ATTIb5311e38128b3f9aea49c9aa3f6f28286A8C30B3/currency-tracker

## graphs and trying to setting stat via func

in the stats comp i needed to set the currency symbol so I made a func with a switch statement.

- problem: calling setState(func()) wasnt working,
- solution: just use 'let sym = func()'

trying to get the chart to update:

- added button to add to data.
- added a <p> displaying a data.length() counter to ensure its working and updated in dom

tried- using a let var and then passing it as the param when calling the graph func, then update the let var on btn click
result- the let doesnt update in the rendered dom. useState is needed

tried- using useState and then passing it as the param when calling the graph func, then setUsestate on btn click
-result, setState(arr.push()) doesn't work,

--Main problem:

- setState of the stored data within a nested func won't update the parent component with the graph
- having a state outside of it to monitor

FIX: useeffect and add to the setData within there (or call a func to do it)

## BUG on graph update

note: still functioning but points are strange
The forum: https://github.com/pmndrs/react-spring/issues/1078

```react-spring-web.esm.js:68 Error:
Error: <g> attribute transform: Expected ')', "…855130267768e-14translate(, ), 6…".
```

### API data for STATS:

// "open": "20771",
// "high": "21012",
// "low": "20361",
// "last": "20697",
// "volume": "2109.00715844",
// "vwap": "20729",
// "bid": "20694",
// "ask": "20697",
// "open_24": "20710",
// "percent_change_24": "-0.06",

### strange and inconsistant api fetches

- problem: when trying to add the 'fetch after Xsecs' feature i noticed that it would sometimes display the new starts
- tried: console.log the response, it was inconsistent. sometimes it was the btn api/ other times it was the stats(which would then display)
- var 'data', 'res', and even the func name are all the same in each useEffect(fetch) within the same component creating many issues
- tried rename fetchFunc(), data, res. didnt work
- i noticed a pattern in the calls:
- - btns/ currency/ stats/ btns/ currency/ stats
- tried: and if statement to not run buttons fetch if already done.. no affect
- Clicking multiple btns results in new fetchs. after the time limit ALL the fetches previously done will very quickly cycle on themselves,
  it seems the fetch loop doesnt end when the use clicks another thing

  - Try, one single fetch and ... maybe not

- if the fetch on a btn click has an empty uri endpoint (controlled by usestate), it returned the btns. thats the way the api is structured. this led to confusion about why a seperate fetch was runningon click... it wasn't it just seemed to be

#### still have the issue of the cycling of fetch funcs, even after another btn is clicked

- cancelling the func on click might be the solution...
- using the setinterval with a cancel return works, settimeout didn't
- helped: https://rapidapi.com/guides/api-requests-intervals

#### clicking on a btn and setting state,

- issue, click btn and triggering fetch, the usestate that handled the url was set to the btn picked PREVIOUSLY than the one the user had just pressed.
- solution, chaining setstates eg:setname(e.taget.innerHTML), seturl(name) because seturl(e.taget.innerHTML)... it was more complex,

### improving ux on retriving stats after btn press

- problem: when clicking a btn the user currently has to wait the interval time until the data is set,
- tried: trying to call and func when the useEffect is started and then also within the setinterval-
  this will mean i can fetch the data on click without waiting for the setinterval time
  if it works i'll see hi on click and then after every interval too
- Sucess: UX sped up, calling the fetch as a func from with the useffect() setinterval

### tweaking the graph

- ux, the api can be called indefinitly, this makes the graph almost impossible to read. deleting the first entire after 10 entires will help keep it readable
- problem, when change the stats, the graph data carries over, should be a quick fix, clear the data

### imrpove graph readabilty:

- as time goes on, the values on the furthest left disappear
- unable to scroll as it an svg
- format text/ legend

- with such a small graph the numbers, espeically things like btc, can easy over crowd it and make it unreadable. going for a minimalistic approach

#### graph text formating:

- problem: the y points have decimals and no commas
  tried: `y: fecthedData.last.toLocaleString(),` but it didn't work
- this will have to be a strech goal

### Branches:

- production: deployed on netlify
- main: ready for REVIEW, most complete
- staging:
- extra:

## useful links:

- api:
- - https://wanago.io/2022/04/11/abort-controller-race-conditions-react/
- - https://medium.com/@icjoseph/using-react-to-understand-abort-controllers-eb10654485df

### a scrolling graph, an idea to try:

- each time you add to the data, add to the width
- wrap it in a div with overlap:scroll and a fixed width

### favicon/ bitcoin svg:

- https://commons.wikimedia.org/wiki/File:Bitcoin_logo.svg#/media/File:Bitcoin.svg
- editing the colors to match web style

# Endpoint

- `/` Main page
- `/buttonsandstats` Page with isolated buttons/ stats/ graph component on it
- `/avgticval` Page with isolated average ticker value component on it
- `pages not found error` handled with a 404 page

### problem with websocket not fetching data

- websocket stopped fetching data
- tried: compared the broken branch to a functioning branch (staging > production)
- tried:git checkout timestamp to walk through issues and at which point it broke
- Fix: a different browser- maybe stored files are at the limit, need to investigate further

### altering coinbase logo colour to fit in
