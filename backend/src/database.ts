import * as mongodb from "mongodb";
import { Movie } from "./models/movie";
import { User } from "./models/user";

export const collections: {
  movies?: mongodb.Collection<Movie>;
  users?: mongodb.Collection<User>;
} = {};

export async function connectToDatabase(uri: string) {
  const client = new mongodb.MongoClient(uri);
  await client.connect();

  const db = client.db("WebProject");
  //await applySchemaValidation(db);

  const moviesCollection = db.collection<Movie>("movies");
  collections.movies = moviesCollection;

  const userCollection = db.collection<User>("users");

  // make email unique value for each user
  await userCollection.createIndex({ email: 1 }, { unique: true });

  collections.users = userCollection;
}

/*async function applySchemaValidation(db: mongodb.Db){
    const jsonSchema = {
        $jsonSchema: {
            bsonType: 'object',
            required: []
        }
    }
}*/
