# Crypto Monitor Frontend Project

# Tom's example.

Content:

1. [ The Site ](#site)
2. [ Preview ](#preview)
3. [ Brief ](#brief)
4. [ Tech Used ](#techused)
5. [ Install ](#install)
6. [ Design ](#design)
7. [ Development notes: ](#knownissues)

- [ Websockets ](#websocket)

  - [ Websocket setting state error ](#websocketstateerr)
  - [ Websocket not fetching ](#websocketnofetch)

  - [ Animate text on update ](#websockettextupdate)

- [ Api ](#api)
  - [ API structure ](#apistructure)
  - [ API fetch error ](#apifetcherr)
  - [ API fetch speed ](#apifetchspeed)
- [ SVG file types ](#svg)
- [ favicon ](#favicon)
- [ graph ](#graph)

  - [ graph set data ](#graphsetdata)
  - [ graph formatting text ](#graphtext)
  - [ graph tweaking ](#graphtweaking)
  - [ Improve graph reability ](#graphreadable)
  - [ Graph scrolling ](#graphscrolling)
  - [ Graph bug ](#graphbug)

- [ .SVG ](#svg)
  - [ Svg type error ](#svgtypeerr)
  - [ Svg format error ](#svgformaterr)
  - [ Altering SVG colour ](#editsvg)

8. [ Task Management ](#taskmanagement)
   - [ Kanban Board ](#kanban)
   - [ Branches ](#branches)
9. [ Useful Linkes ](#links)
10. [ Future Development ](#future)

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

# 7. Development notes:

<a name="websocket"></a>

## Websockets:

<a name="websocketstateerr"></a>

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

## Websocket not fetching data:

- websocket stopped fetching data
- tried: compared the broken branch to a functioning branch (staging > production)
- tried:git checkout timestamp to walk through issues and at which point it broke
- Fix: a different browser- maybe stored files are at the limit, need to investigate further

<a name="websockettextupdate"></a>

## Animate text style when updated with Websockets:

- either: useEffects/ onChange/ firing a func from the websocket
- then changing the dom p tag and adding a new class
  ^ all seems a bit much for little reward

<a name="api"></a>

## Api:

<a name="apistructure"></a>

## Api Structure:

Use in the "stats" component:

```
"open": "20771",
"high": "21012",
"low": "20361",
"last": "20697",
"volume": "2109.00715844",
"vwap": "20729",
"bid": "20694",
"ask": "20697",
"open_24": "20710",
"percent_change_24": "-0.06",
```

Using only a few for the stats section, `"last":` will be used in the graph

<a name="apicors"></a>

## CORS Issue

CORS missing on BitStamp, especially the BTC/USD ticker. Not sure what is happening. Sometimes the CORS is in the header, other times there's no CORS.

- tried: various headers (mode:no-cors/mode:cors/etc)
- tried: inspecting the api link and checking the repsonses header
- fix: try{} catch{}. If the fetch fails due to CORS issues, the catch waits (setTimeout()) for a few seconds before trying again. It could take up to four attempts or only one.
- a possible fix: proxy server

<a name="apifetcherr"></a>

## Api Fetch Data for Buttons Error:

fetch() err in useEffect (btn population)

-trying to fetch from `https://www.bitstamp.net/api/v2/trading-pairs-info/`,

- returns the data without any issues
- BUT error:
  ` Uncaught (in promise) TypeError: Failed to fetch`

- tried: async/await: no difference
- tried: adding to header (mode:cors, method:GET,etc): no difference
- tried: checkingthe url (Http/https, etc): no difference
- tried: a different url: it works err free with a different url "https://www.themealdb.com/api/json/v1/1/random.php"
- Conclusion: must be a server side issue, need to investigate further

potential fix to try:

- try{} catch{setTimeout(), fetchAgain()}

<a name="apifetchspeed"></a>

## API fetching speed varys

- Problem: the api links vary in speed and quality. BTC/USD is slower and often has Cors issues resulting in a failed fetch (serval others out of the 175 tickers are the same)
- Tried: using websocket instead to bypass CORS- changing websocket channels could be done I believe but it's not time efficent, also there are already several websockets running on the avgtickval component
- Tried: Reseaching a proxy server to host the api data and add cors to my proxy server- seems like a heavy handed approach
- A stretch goal

<a name="graph"></a>

## Graph:

<a name="graphsetdata"></a>

## trying to setting graph data via func

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

<a name="graphtext"></a>

## Graph text formating:

- problem: the y points have decimals and no commas
  tried: `y: fecthedData.last.toLocaleString(),` but it didn't work
- this will have to be a strech goal

<a name="graphtweaking"></a>

## Tweaking the graph

- ux, the api can be called indefinitly, this makes the graph almost impossible to read. deleting the first entire after 10 entires will help keep it readable
- problem, when change the stats, the graph data carries over, should be a quick fix, clear the data

<a name="graphreadable"></a>

## Improve graph readabilty:

- as time goes on, the values on the furthest left disappear
- unable to scroll as it an svg
- format text/ legend

- with such a small graph the numbers, espeically things like btc, can easy over crowd it and make it unreadable. going for a minimalistic approach

<a name="graphscrolling"></a>

## Scrolling graph, an idea to try:

- each time you add to the data, add to the width
- wrap it in a div with overlap:scroll and a fixed width

<a name="graphbug"></a>

## Bug on graph update

note: still functioning but points are strange
The forum: https://github.com/pmndrs/react-spring/issues/1078

```react-spring-web.esm.js:68 Error:
Error: <g> attribute transform: Expected ')', "…855130267768e-14translate(, ), 6…".
```

<a name="svg"></a>

## SVG:

<a name="svgtypeerr"></a>

## SVG type error:

importing svg's:

```error:
Cannot find module './coinbase_logo.svg' or its corresponding type declarations.
```

solutions:

Make a new script called `custom.d.ts` with the following content:

```
declare module "\*.svg" {
const content: any;
export default content;
}
```

Add the `custom.d.ts` to `tsconfig.json` as below

`"include": ["src/components", "src/custom.d.ts"]`

<a name="svgformaterr"></a>

## SVG format errors:

problem: so of the logo svg files don't display:

`` SyntaxError: unknown file: Namespace tags are not supported by default. React's JSX doesn't support namespace tags. You can set`throwIfNamespace: false`to bypass this warning. ``

tried (failed):

In the SVG file, tried changing the following in case the names protected in react/js:

- `sketchType TO sketchType`
- `xmlnsXlink TO xmlnsXlink`
- `xlinkHref TO xlinkHref`

Solution:
changing the formated coded to something much cleaner using:

https://jakearchibald.github.io/svgomg/

<a name="editsvg"></a>

## Altering SVG colour

The coinbase logo was to dark and didn't fix in well with the other logos or the background
solutions: edit the colour of the svg, it was faster than dealing with it in another way

#### clicking on a btn and setting state,

- issue, click btn and triggering fetch, the usestate that handled the url was set to the btn picked PREVIOUSLY than the one the user had just pressed.
- solution, chaining setstates eg:setname(e.taget.innerHTML), seturl(name) because seturl(e.taget.innerHTML)... it was more complex,

### improving ux on retriving stats after btn press

- problem: when clicking a btn the user currently has to wait the interval time until the data is set,
- tried: trying to call and func when the useEffect is started and then also within the setinterval-
  this will mean i can fetch the data on click without waiting for the setinterval time
  if it works i'll see hi on click and then after every interval too
- Sucess: UX sped up, calling the fetch as a func from with the useffect() setinterval

<a name="favicon"></a>

### favicon/ bitcoin svg:

- https://commons.wikimedia.org/wiki/File:Bitcoin_logo.svg#/media/File:Bitcoin.svg
- editing the colors to match web style

<a name="taskmanagement"></a>

# 8. Task Management

<a name="kanban"></a>

## Kanban Board:

trello board:
https://trello.com/invite/b/sqfWvc0x/ATTIb5311e38128b3f9aea49c9aa3f6f28286A8C30B3/currency-tracker

<a name="branches"></a>

## Branches:

`production` deployed on netlify

`main` ready for Review, not touched since Wednesday 2nd Nov.

`staging` regular development branch

`extra` unused

<a name="links"></a>

# 9. Useful links:

api:

    https://wanago.io/2022/04/11/abort-controller-race-conditions-react/

>

    https://medium.com/@icjoseph/using-react-to-understand-abort-controllers-eb10654485df

fix svg files:

    https://jakearchibald.github.io/svgomg/

<a name="future"></a>

# 10. Future development:

If I had more time to work on the project I would:
