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

5. Run the project (`pnpm tauri dev`)
    
    The first build is painfully slow (took me 5 minutes), but next builds are ultra fast.
    
TODO:
* python venv
