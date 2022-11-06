# Crypto Monitor Frontend Project

<br><br>

Content:

1. [ The Site ](#site)
2. [ Preview ](#preview)
3. [ Brief ](#brief)
4. [ Tech Used ](#techused)
5. [ Install ](#install)
6. [ Design ](#design)
7. [ Known Issues ](#knownissues)
   - [ Websockets ](#websocket)
   - [ Api ](#api)
     - [ API structure ](#apistructure)
   - [ SVG file types ](#svg)
   - [ favicon ](#favicon)
   - [ graph ](#graph)
   - [ .SVG ](#svg)
     - [ Svg type error ](#svgtypeerr)
     - [ Svg format error ](#svgformaterr)
8. [ Task Management ](#taskmanagement)
   - [ Kanban Board ](#kanban)
   - [ Branches ](#branches)
9. [ Useful Linkes ](#links)

<br><br>

# 1. Site

<https://tomscryptomonitor.netlify.app/>

### Endpoint

- `/` Main page
- `/buttonsandstats` Page with isolated buttons/ stats/ graph component on it
- `/avgticval` Page with isolated average ticker value component on it
- `pages not found error` handled with a 404 page

_Hosted on netlify_

<a name="preview"></a>

<br><br>

# 2. Preview

![preview image](https://user-images.githubusercontent.com/91187363/199965059-9dcca3ec-f64d-4f98-a5dd-c944e854bdea.PNG)
<a name="site"></a>

<a name="brief"></a>

# 3. Brief

<a name="techused"></a>

# 4. Tech Used

- React
- Typescript
- WebSocket
- Nivo (line graphs)
- Javascript
- HTML (TSX)
- CSS
- Git
- GitHub

<a name="install"></a>

# 5. Install

- ` npm install`

  - Install the depencies:

- `npm start`

  - Run the project on local port:
  - Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

- `npm test`
  - run tests (currently zero tests)

<a name="design"></a>

# 6. Design

<br><br>
<a name="knownissues"></a>

# 7. Know Issues

<br><br>

<a name="websocket"></a>

## Websockets:

## Setting state from Websocket Errors:

**Context:**

The component uses 3 websocket connects that are established with 3 different sites:

- CoinBase
- BitFilex
- BitStamp

**Problem:**

When using websocket channels that returned data every 0.05secs, like on coinbase, caused performance issues.
This became a greater issue when trying to sort through the response data using a 2x nested if statement, and then setData to a var(usestate)

**Solution:**

a websocket channel that sent every 5sec and only if changes had been made. Also changing from any changes to only 'Buy' changes so if statements could be removed
tried: adding 'Sec-WebSocket-Extensions: permessage-deflate' to the websocket header but add no sucess

- data type: Typescripts strict data types made handling the various responses from each websocket easier. (some gave 'string', other 'number' )

- After a few minutes the websockets slowly begin to get this error:
  `AverageTickerValues.tsx:110 WebSocket connection to 'wss://api-pub.bitfinex.com/ws/2' failed: `

_This doesn't stop the functionality of the component_

<a name="websocketnofetch"></a>

### Not fetching data:

- websocket stopped fetching data
- tried: compared the broken branch to a functioning branch (staging > production)
- tried:git checkout timestamp to walk through issues and at which point it broke
- Fix: a different browser- maybe stored files are at the limit, need to investigate further

<a name="api"></a>

## Api:

<a name="apistructure"></a>

## Api Structure:

Use in the "stats" component:

````"open": "20771",
"high": "21012",
"low": "20361",
"last": "20697",
"volume": "2109.00715844",
"vwap": "20729",
"bid": "20694",
"ask": "20697",
"open_24": "20710",
"percent_change_24": "-0.06",```

<a name="graph"></a>

## Graph:

<a name="svg"></a>

## SVG:

<a name="svgtypeerr"></a>

## SVG type error:

importing svg's:

```error:
Cannot find module './coinbase_logo.svg' or its corresponding type declarations.
````

solutions:

custom.d.ts with the following content:

declare module "\*.svg" {
const content: any;
export default content;
}

Add the custom.d.ts to tsconfig.json as below

"include": ["src/components", "src/custom.d.ts"]

<a name="svgformaterr"></a>

### svg format errors:

problem: so of the logo svg files don't display:
`SyntaxError: unknown file: Namespace tags are not supported by default. React's JSX doesn't support namespace tags. You can set`throwIfNamespace: false`to bypass this warning.`

tried (failed):
In the SVG file, tried changing the following in case the names protected in react/js:
`sketchType TO sketchType`
`xmlnsXlink TO xmlnsXlink`
`xlinkHref TO xlinkHref`

Solution:
changing the formated coded to something much cleaner using:

`https://jakearchibald.github.io/svgomg/`

#### clicking on a btn and setting state,

- issue, click btn and triggering fetch, the usestate that handled the url was set to the btn picked PREVIOUSLY than the one the user had just pressed.
- solution, chaining setstates eg:setname(e.taget.innerHTML), seturl(name) because seturl(e.taget.innerHTML)... it was more complex,

### improving ux on retriving stats after btn press

- problem: when clicking a btn the user currently has to wait the interval time until the data is set,
- tried: trying to call and func when the useEffect is started and then also within the setinterval-
  this will mean i can fetch the data on click without waiting for the setinterval time
  if it works i'll see hi on click and then after every interval too
- Sucess: UX sped up, calling the fetch as a func from with the useffect() setinterval

### altering coinbase logo colour to fit in

<a name="taskmanagement"></a>

# 8. Task Management

<a name="kanban"></a>

## Kanban Board:

trello board:
https://trello.com/invite/b/sqfWvc0x/ATTIb5311e38128b3f9aea49c9aa3f6f28286A8C30B3/currency-tracker

<a name="branches"></a>

## Branches:

`production` deployed on netlify

`main` ready for REVIEW, most complete

`staging`

`extra`

<a name="links"></a>

# 9. Useful links:

api:

    https://wanago.io/2022/04/11/abort-controller-race-conditions-react/

>

    https://medium.com/@icjoseph/using-react-to-understand-abort-controllers-eb10654485df
