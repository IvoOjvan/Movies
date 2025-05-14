# Movies

Angular and Node.js Express full stack project.

# Installation

## 1. In _backend_ folder create _.env_ file

You should replace <user_name> and <db_password> with your Atlas credentials.

Your atals database should be named **webDB** and it should contain **projects** collection.

```
ATLAS_URI="mongodb+srv://<user_name>:<db_password>@cluster0.vwa4dco.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
```

## 2. Enter _backend_ folder and start backend server

```
npm install
npx ts-node .\src\server.ts
```
