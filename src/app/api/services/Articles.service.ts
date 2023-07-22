import 'server-only';
import { connectToDatabase } from '../config/mongodb';
import { Collection, Db, ObjectId } from 'mongodb';

class ArticleService {

    private db: Db | undefined;
    private collection: Collection | undefined;
    private connected: boolean = false;

    async init() {
        console.log('ArticleService started')
        this.db = await connectToDatabase();
        this.collection = await this.db.collection('articles');
        this.connected = true;
    }

    isConnected() {
        return this.connected;
    }

    async getArticles() {
        if (!this.collection) {
            return [];
        }
        return await this.collection.find().toArray();
    }

    async getArticleById(id: string) {
        if (!this.collection) {
            return null;
        }
        return await this.collection.findOne({ _id: new ObjectId(id) });
    }

    async createArticle(article: any) {
        if (!this.collection) {
            return null;
        }
        return await this.collection.insertOne(article);
    }

    async updateArticle(id: string, article: any) {
        if (!this.collection) {
            return null;
        }
        return await this.collection.updateOne({ _id: new ObjectId(id) }, { $set: article });
    }

    async deleteArticle(id: string) {
        if (!this.collection) {
            return null;
        }
        return await this.collection.deleteOne({ _id: new ObjectId(id) });
    }

}

let articleServiceInstance : ArticleService | null = null;


export async function getService() {
    if (!articleServiceInstance ) {
        articleServiceInstance = new ArticleService();
    }
    await articleServiceInstance.init();
    return articleServiceInstance;
}

