'server only';
import { MongoClient, MongoClientOptions } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri: string = process.env.MONGO_DB_CONNECTION || '';

let cachedClient: MongoClient | null = null;
const db = { connected: false }

if (!cachedClient) {
    cachedClient = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as MongoClientOptions);
}

cachedClient.on('open', _=>{ db.connected=true, console.log('DB connected.') })
cachedClient.on('topologyClosed', _=>{ db.connected=false, console.log('DB disconnected.') })

export async function connectToDatabase() {
    if (!db.connected) {
      await cachedClient!.connect();
    }
    return cachedClient!.db();
  }
