import 'server-only';

import { NextRequest, NextResponse } from 'next/server';
import { OpenAIService } from '../services/OpenAI.service';
import { notAuthorized } from '../services/AuthService';
import { getService } from '../services/Articles.service';


export async function POST(request: NextRequest) {

    if(await notAuthorized()){
        return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
    }

    const input = await request.json();
    if (!input && !input.questions) {
        return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }


    const query = `
    Estas realizando un proceso de selección de artículos para determinar si son relevantes para tu investigación.
        Tu Rol: ${input.role}
        Contexto de la investigación: ${input.context}
        Reglas:
        Se ha definido el siguiente criterio de clasificación:
           * Las preguntas de investigación se encuentran en el campo "questions" del json de entrada envuelto en comillas triples ("""). 
           * Vas a determinar si el artículo tiene relevancia para la investigación según el título (title) , el resumen (abstract) y las palabras clave (keywords).
           * Dentro del prompt tambien se esperan definiciones para aclarar el contexto de la investigación.
           * Aunque los artículos estén en inglés, el resultado debe ser entregado en español.
           
        Como resultado, se espera un json con el siguiente formato:
        {
            result: [
                {
                    question : "some question", // primera pregunta de investigación
                    result: [
                        {
                            "title": true, // si el título es relevante para la pregunta de investigación
                            "explain": "some explanation" // explicación de por qué el título es relevante
                        },
                        {
                            "abstract": false, // si el resumen es relevante para la pregunta de investigación
                            "explain": "some explanation" // explicación de por qué el resumen es relevante
                        },
                        {
                            "keywords": true, // si las palabras clave son relevantes para la pregunta de investigación
                            "explain": "some explanation" // explicación de por qué las palabras clave son relevantes
                        }

                    ]
                }
            ]
        }        

        JSON de entrada con datos del artículo:
        """{
            "title": "${input.article.title}",
            "abstract": "${input.article.abstract}
            "keywords": "${input.article.keywords}",
            "questions": ${input.questions}
        }"""

    `;

    const openai = new OpenAIService();

    console.log('/n****************************************')
    console.log(query)
    console.log('/n****************************************/n/n')

    const response = await openai.getDescription(query)


    return NextResponse.json(response, { status: 200 });

}