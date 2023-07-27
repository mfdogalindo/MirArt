'use client';
import AntDProvider from '@/utils/AntDProvider';
import { Table, Modal, Input, message, Spin } from 'antd';
import Title from 'antd/es/typography/Title';
import { SetStateAction, useEffect, useState } from 'react';
import AuthProvider from '../../components/AuthProvider';
import SessionGuard from '../../components/SessionGuard';

export interface ArticleType {
    _id: string;
    title: string;
    author: string;
    doi: string;
    abstract: string;
    keywords: string;
    AI?: string;
}

const Lector = () => {
    const [articles, setArticles] = useState<ArticleType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState<ArticleType | null>(null);
    const [filterValue, setFilterValue] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

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
            } catch (err: any) {
                message.error('Error al recuperar los datos: \t' + err.message);
                setError('Error al recuperar los datos..');
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    const handleRowClick = (record: SetStateAction<ArticleType | null>) => {
        setSelectedArticle(record);
        setModalVisible(true);
    };

    const handleFilterChange = (e: any) => {
        setFilterValue(e.target.value);
    };

    const filteredArticles = articles.filter((article: ArticleType) =>
        article.title.toLowerCase().includes(filterValue.toLowerCase()) ||
        article.keywords?.toLowerCase().includes(filterValue.toLowerCase())
    );

    const rowNumber = (_:any, __: any, index: any) => {
        return ((currentPage - 1) * pageSize) + index + 1;
    };

    const doiRender = (_:any, record: any, __: any) => {
        let code = record.doi.replace('https://doi.org/', '');

        return <a href={'https://doi.org/'+code} target='_blank'>{code}</a>
    };

    const renderQuestions = (data: any) => {
        try{
            return (<div>
            {
                data.map((item: any, indexa: number) => {
                    return (
                        <div key={indexa} className='py-2'>
                        <p className='py-2 font-bold'>{item.question}</p>
                        {item.result.map((result: any, index: number) => {
                            return (
                                <div key={index}>
                                    <p>{result.answer}</p>
                                    <p><b>{result.type}: </b>{result.fits ? 'Si' : 'No'} - {result.explain}</p>
                                </div>
                            )
                        })}
                        </div>
                    )
                })
                }
            
        </div>)
        }catch{
            return (<div>{JSON.stringify(data)}</div>)
        }

    }

    const aiRender = (_:any, record: any, __: any) => {
        try{
            let sumFits = 0;
            const questionsSummary : string[] = [];

            record.AI.forEach((item: any, index: number) => {
                let fitsCount = 0;

                item.result.forEach((result: any) => {
                if (result.fits) {
                    fitsCount++;
                }
                });

                sumFits += fitsCount;
                questionsSummary.push(`Q${index + 1}: ${fitsCount}`);
            });

            return questionsSummary.join('\n');
        }
        catch(err){
            console.log(err, record)
            return 'No';
        }
    };

    const columns = [
        {
            title: '#',
            dataIndex: 'index',
            key: 'index',
            render: rowNumber
        },
        {
            title: 'Autor',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: 'Título',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'AI',
            dataIndex: 'AI',
            key: 'AI',
            render: aiRender
        },
        {
            title: 'DOI',
            dataIndex: 'doi',
            key: 'doi',
            render: doiRender
        }
    ];

    return (
        <AuthProvider>
        <div>
            {error && <div>{error}</div>}
            {loading ? (
                <div className=''>
                    <div className='app-center w-full' style={{ height: 'calc(100vh - 300px)' }}>
                        <div>
                            <Spin size='large' />
                        </div>

                    </div>
                    <h1 className='text-white text-center'>Cargando...</h1>
                </div>
            ) : (
                <AntDProvider>
                    <div className=' app-center'>
                        <div className='app-card'>
                            <h1 className='pb-4 px-2'>Buscar artículos</h1>
                            <Input placeholder="Filtrar por título o claves" value={filterValue} onChange={handleFilterChange} />
                            <Table
                                columns={columns}
                                dataSource={filteredArticles}
                                rowKey="_id"
                                onRow={(record) => ({
                                    onClick: () => handleRowClick(record)
                                })}
                                pagination={{
                                    current: currentPage,
                                    pageSize: pageSize,
                                    onChange: (page, size) => {
                                        setCurrentPage(page);
                                        setPageSize(size);
                                    },
                                    showSizeChanger: true,
                                    pageSizeOptions: ['10', '20', '30', '40'],
                                    total: articles.length
                                }}
                                size='small'
                            />

                            {selectedArticle && (
                                <Modal
                                    title={selectedArticle.title}
                                    visible={modalVisible}
                                    onCancel={() => setModalVisible(false)}
                                    footer={null}
                                >
                                    <p className='pb-2'><b>ID:</b> {selectedArticle._id}</p>
                                    <p className='pb-2'><b>Autor:</b> {selectedArticle.author}</p>
                                    <p className='pb-2'><b>DOI:</b> {selectedArticle.doi}</p>
                                    <p ><b>Resume:</b></p>
                                    <p className='app-card'>{selectedArticle.abstract}</p>
                                    <p><b>Claves:</b> {selectedArticle.keywords}</p>
                                    <p ><b>AI:</b></p>
                                    <div className='app-card'>{renderQuestions(selectedArticle.AI)}</div>
                                    
                                </Modal>
                            )}
                        </div>
                    </div>
                </AntDProvider>
            )}
        </div>
        </AuthProvider>
    );
};

export default Lector;
