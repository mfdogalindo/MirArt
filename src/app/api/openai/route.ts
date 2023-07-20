import { NextRequest, NextResponse } from 'next/server';
import { OpenAIService } from '../services/OpenAI.service';
import { isAuthorized } from '../services/AuthService';

export async function POST(request: NextRequest) {

    if(await isAuthorized()){
        return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
    }

    const input = await request.json();
    if (!input && !input.prompt) {
        return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const openai = new OpenAIService();

    const response = await openai.getDescription(input.prompt);

    return NextResponse.json(response, { status: 200 });

}