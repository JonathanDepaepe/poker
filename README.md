<p align="center"><a href="https://king-prawn-app-ihi8t.ondigitalocean.app/" target="_blank"><img src="https://i.imgur.com/PU5fUtY.png" width="400"></a></p>

# Software Engineering - HPTM - Web App

[![Generic badge](https://img.shields.io/badge/Version-Alpha-red.svg)](https://shields.io/)


## Useful links

- Web app: https://king-prawn-app-ihi8t.ondigitalocean.app/
- API Swagger: https://pokermanager.games/swagger/index.html
- API: https://pokermanager.games/api/

## How to run the Web app locally

### Required
-  Connection to the [API](https://pokermanager.games/swagger/index.html)
-  Latest version of [NodeJs](https://nodejs.org/en/download/)


### Installing

- Clone the server into your preferred folder
    - `git clone https://github.com/silentz420/poker.git`
- Install the packages
    - `npm install`
- Run the Web app
    -  `npm run build`
    -  `npm run start`

## How to create a new language

- Create a new file in `./lang/{LANGCODE}.json`
- Copy the content from `./lang/en.json` into your new file
- Translate every line
- Import the file into `_app.js` and add it in the object `const messages`
- Import the flag into `/compononts/navigation/navTop.jsx` from the `'country-flag-icons/react/3x2'`
- Add and change in the same file the following into the a tag (change LOCALE and FLAGIMPORT):
  ```jsx 
  {locale === LOCALE && (<><FLAGIMPORT title="" className="flag-icon  rounded"/><p className={"height-fit-content ps-2 mt-auto text-white mb-auto"}>LOCALE</p></>)}
  ```
- As last add and change in the same file the following into the ul tag (change LOCALE and FLAGIMPORT):
  ```jsx
  <li><Link className={"text-decoration-none text-white ps-2 d-flex mt-2"} locale={"LOCALE"} href={asPath}><FLAGIMPORT title="" className="flag-icon rounded"/><p className={"ps-2 mt-auto mb-auto"}>LOCALE</p></Link> </li>
  ```

## How to Save club and profile images locally instead of Spaces

- For profile go into `/pages/api/profile/profile.js` change `await uploadProfile(...)` to `await saveFile(...)`
- For clubs go into `/pages/api/club.js` change `await uploadFile(...)` to `await saveFile(...)`