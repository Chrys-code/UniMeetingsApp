# UniMeetingsApp

This is an application allows students to estimate the probability of catching the virus from school mates. Also help schools to explore connections between students those might be affected if someone signs illness.

## Existing accounts to access the application for live testing on Heroku:

Name - Password

- Mina Bowers - minapass
- Tobey Monaghan - tobeypass
- Joseph Franco - josephpass
- Rianne Meyers - riannepass
- Nancy Jimenez - nancypass

And any other user you can see within the application:
 name - firstname+"pass"

Capital letters and spacing matters!

## Getting Started

To install locally:

- Clone the repository
- In the root folder:
- Run "npm run installPackages" - This should install both server and client-side tools
- In Client > src > index.js replace apollo client url from live host to local. (Both provided in the file)
- Replace mongoDB connection to your mongoDB connection
- Run "npm run dev" - This should start a nodemon server concurrently with front-end in the same terminal

## Deployment on live system

- The application built to be hosted on Heroku. 
- In Client > src > index.js replace apollo client url from local to the host url (url it will be hosted on).(Local is provided only)
- Upload to GitHub

  On Heroku:
  - Open a new project
  - On deploy tab: 
    - Attach GitHub Repository in which the application is uploaded
    - Scroll down the page, click deploy
    - Heroku automatically recognize heroku-postbuild (by now it is not required as build is enough)
    - Wait until Heroku build the application
    
  On other live host:
   - Run "npm run build" in the root folder

## Built With

* [React](https://reactjs.org/) - The web framework used
* [Framer-motion](https://www.npmjs.com/package/framer-motion) - The animations made with
* [Webpack](https://webpack.js.org/) - Dependency Management
* [SCSS](https://sass-lang.com/) - Style Sheet
* [Apollo](https://www.apollographql.com/docs/) - Front connection to server
* [GraphQl](https://graphql-compose.github.io/) - Backed with
* [Node/Express](https://sass-lang.com/) - Backed with
* [MongoDB](https://www.npmjs.com/package/mongodb) - Database used

## Authors

* **Krisztian Nagy** - *End-to-End development* - [Chrys-code](https://github.com/Chrys-code)


## Acknowledgments

This project was created as a University Assessment.
