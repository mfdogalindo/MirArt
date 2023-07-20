'server only';
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../config/mongodb'
import { isAuthorized } from '../services/AuthService';

export async function GET() {
    //const doiParam = request.nextUrl.searchParams.get("doi");

    if(!await isAuthorized()){
        return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
    }

    try {
        const db = await connectToDatabase();
        const collection = await db.collection('articles');

        const articles = await collection.find({}).toArray();

        return NextResponse.json(articles, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {

    if(await isAuthorized()){
        return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
    }

    try {
        const db = await connectToDatabase();
        const collection = await db.collection('articles');

        const decoder = new TextDecoder();
        const reader = request.body && request.body.getReader();
        let result = '';

        if (reader) {
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                if (value) result += decoder.decode(value);
            }
        }

        const data = JSON.parse(result);

        const existingArticle = await collection.findOne({ doi: data.doi });

        if (existingArticle) {
            return NextResponse.json({ error: 'Article already exists' }, { status: 400 });
        }

        let responseDb = await collection.insertOne(data);

        return NextResponse.json(responseDb, { status: 201 });

    }
    catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
