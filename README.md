# Movies :clapper:

Angular and Node.js Express full stack project.

# Tech Stack

Frontend: Angular 19, Bootstrap 5, ng-bootstrap, RxJS, Swiper

Backend: Node.js, Express.js, MongoDB (native driver)

Authentication: JWT, bcrypt

Validation: Joi

Dev Tools: TypeScript, Nodemon, ts-node

# Prerequisites

1. Node.js (v18+)
2. Angular CLI
3. MongoDB running locally or on Atlas

# Installation

## 1. In _backend_ folder create _.env_ file

You should replace <user_name> and <db_password> with your Atlas credentials.

Your atals database should be named **webDB** and it should contain **projects** collection.

```
ATLAS_URI="mongodb+srv://<user_name>:<db_password>@cluster0.vwa4dco.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
```

Also add JWT SECRET in .env file.

## 2. Enter _backend_ folder and start backend server

```
npm install
npm run dev
```

## 3. Setup Frontend

```
cd movie-app
npm install
```

Before running the Angular app, create a configuration file to securely store your TMDB API keys:

Create the file and add it to .gitignore:
movie-app/src/environment.ts

```
export const environment = {
  apiReadAccessToken: 'YOUR_TMDB_READ_ACCESS_TOKEN',
  apiKey: 'YOUR_TMDB_API_KEY',
};
```

To run the Angular app use:

```
ng serve
```

The Angular app will run at http://localhost:4200.

## Backend Features

- JWT-based user authentication
- Password hashing with bcrypt
- Request validation with Joi
- CORS enabled for Angular frontend

## Frontend Features

- Responsive UI with Bootstrap 5
- Angular routing and forms
- Swiper for carousels
- TMDB API integration for dynamic movie content
- Icon support via ng-icons
- Lazy loading and modular design
