'use client';
import AntDProvider from '@/utils/AntDProvider';
import { Table, Modal, Input, message, Spin } from 'antd';
import Title from 'antd/es/typography/Title';
import { SetStateAction, useEffect, useState } from 'react';

export interface ArticleType {
    _id: string;
    title: string;
    author: string;
    doi: string;
    abstract: string;
    keywords: string;
}

const Lector = () => {
    const [articles, setArticles] = useState<ArticleType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState<ArticleType | null>(null);
    const [filterValue, setFilterValue] = useState('');

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
                setArticles(data);
            } catch (err) {
                message.error('Error al recuperar los datos.');
                setError('Error al recuperar los datos.');
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
        article.keywords.toLowerCase().includes(filterValue.toLowerCase())
    );

    const columns = [
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
            title: 'DOI',
            dataIndex: 'doi',
            key: 'doi',
        },
    ];

    return (
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
                            <Table columns={columns} dataSource={filteredArticles} rowKey="_id" onRow={(record) => ({ onClick: () => handleRowClick(record) })} />
                            {selectedArticle && (
                                <Modal
                                    title={selectedArticle.title}
                                    visible={modalVisible}
                                    onCancel={() => setModalVisible(false)}
                                    footer={null}
                                >
                                    <p>ID: {selectedArticle._id}</p>
                                    <p>Autor: {selectedArticle.author}</p>
                                    <p>DOI: {selectedArticle.doi}</p>
                                    <p>Resume: {selectedArticle.abstract}</p>
                                    <p>Claves: {selectedArticle.keywords}</p>
                                </Modal>
                            )}
                        </div>
                    </div>
                </AntDProvider>
            )}
        </div>
    );
};

export default Lector;
