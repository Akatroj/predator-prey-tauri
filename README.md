# Predator-prey simulation

## Running locally
What you need to run this app in development:

1. Download NodeJS (https://nodejs.org/en/)

    Any recent version (16.X, 18.X, 19.X) should work - I'm using node v19.3.0

2. Install `pnpm` package manager (`npm install --global pnpm`)

3. Install Rust (and MSVC compiler if on windows)

    Detailed cross-platform instructions here: https://tauri.app/v1/guides/getting-started/prerequisites
    
    You may need to reboot your PC after installing these.

4. Install JS dependencies (`pnpm install`)

5. Run the project (`pnpm start`)
    
    The first build is painfully slow (took me 5 minutes), but next builds are ultra fast.
    

## How this works

Python code serves as the 'backend' which calculates every step of the animation.
This code is then executed in the browser using `Pyodide` (CPython in WASM).
We then use use it in a webworker, from which we request calculating a new step 30 times per second.
The data from python backend is deserialized into JS using pyodide after each simulation step.
Then that data is rendered on a canvas using `pixi.js` and on a line chart using `chart.js`

For technical reasons, the python code must be shipped as a `.zip` file in `public` directory.
The package.json has a script - `zip-python` which will take every file from `src-python/src` and get them zipped into `public/python.zip`

When you run `pnpm start` it will not only start the tauri app, but also start a filesystem watch for changes on any python file. When a change is detected in python files, the zip will be recreated and the entire app will refresh.

### why

@PiotrG99 wanted to make the simulation in python, but I wanted to make it in JS, so we decided to mix them.


### ...
pyodide npm package doesn't actually do anything (does not include 200mb of compiled WASM) so we need to import it from CDN.
