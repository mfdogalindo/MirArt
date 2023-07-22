'use client';
import {  message } from 'antd';
import AuthProvider from '@/app/components/AuthProvider';
import AntDProvider from '@/utils/AntDProvider';
import PromptForm from '../molecules/PromptForm';
import ProgressBar from '../molecules/ProgressBar';
import { useEffect, useState } from 'react';
import { ArticleType } from '@/app/lector/templates/Lector';
import Loading from '../molecules/loading';


export default function ClassifyArticles() {

    const [loading, setLoading] = useState(true);
    const [totalArticles, setTotalArticles] = useState(0);
    const [currentArticle, setCurrentArticle] = useState({index: 0, title: ""});
    const [articles, setArticles] = useState<ArticleType[]>([]);
    const [running, setRunning] = useState(false);

    const initialData = {
        role: 'Tu rol será el de un investigador que quiere publicar un artículo en una revista científica.',
        context: 'La investigación esta relacionada con el desarrollo de un framework para IoT Semántico',
        questions: '1 - El artículo está relacionado con el desarrollo de software en el contexto de IoT?. 2 - El artículo tiene relación con IoT Semántico, Web Semántica o Internet Semántica de las Cosas'
    };

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch('/api/articles', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                if(!response.ok) {
                    throw new Error(data.error);
                }
                setArticles(data);
                setTotalArticles(data.length);
            } catch (err: any) {
                message.error('Error al recuperar los datos: \t' + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    const analyzeArticle = async (article: ArticleType, prompt: {role: string, context: string, questions: string}) => {
        try{
            const response = await fetch('/api/openai', {
                method: 'POST',
                body: JSON.stringify({
                    role: prompt.role,
                    context: prompt.context,
                    questions: prompt.questions,
                    article: {title: article.title, abstract: article.abstract, keywords: article.keywords}
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if(!response.ok) {
                message.error('Error al analizar articulo: \t' + data.error);
            }
            return {...article, AI: JSON.stringify(data)};
        } catch (err: any) {
            message.error('Error al analizar articulo: \t' + err.message);
            return article;
        }
    };

    const updateArticle = async (article: ArticleType) => {
        try{
            const response = await fetch('/api/articles', {
                method: 'PUT',
                body: JSON.stringify(article),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if(!response.ok) {
                throw new Error(data);
            }
            return data;
        } catch (err: any) {
            console.error(err);
            message.error('Error al actualizar articulo: \t' + err.error);
            return article;
        }
    };

    const onSubmit = async (prompt: {role: string, context: string, questions: string}) => {
        let currentIndex = 0;
        setRunning(true);
        for (const article of articles) {
            currentIndex++;
            setCurrentArticle({index: currentIndex, title: article.title});
            const result = await analyzeArticle(article, prompt);
            await updateArticle(result); 
        }
        setRunning(false);
    };




    return (
        <AuthProvider>
            <AntDProvider>
                <div className=' app-center'>
                    <div className='app-card'>
                        <h1 className='pb-4 px-2'>Clasificar artículos con IA</h1>
                        {loading ? 
                            <Loading /> : 
                            (
                                <>
                                    <PromptForm initialData={initialData} onSubmit={onSubmit} isRunning={running} />
                                    <ProgressBar total={totalArticles} current={currentArticle.index} title={currentArticle.title} />
                                </>
                            )
                        }
                    </div>
                </div>
            </AntDProvider>
        </AuthProvider>
    );

}
