'use client';
import AntDProvider from '@/utils/AntDProvider';
import { Form, Input, Button, message } from 'antd';


export default function AddArticle() {

    const [form] = Form.useForm();

    const onFinish = async (values: unknown) => {
        try {
            const response = await fetch('/api/articles', {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (response.status !== 200) {
                message.error('Error al registrar: ' + data.error);
            }
            else{
                message.success('Registro guardado correctamente.');
            }
        } catch (err) {
            message.error('Error al guardar el registro.');
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <AntDProvider>
            <div className=' app-center'>
                <div className='app-card'>
                <h1 className='pb-4 px-2'>Registrar artículo</h1>
                    <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                        <Form.Item
                            label="Título"
                            name="title"
                            rules={[{ required: true, message: 'Por favor ingresa el título.' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Autor"
                            name="author"
                            rules={[{ required: true, message: 'Por favor ingresa el autor.' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="DOI"
                            name="doi"
                            rules={[{ required: true, message: 'Por favor ingresa el DOI.' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Resumen"
                            name="abstract"
                            rules={[{ required: true, message: 'Por favor ingresa el resumen.' }]}
                        >
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item
                            label="Claves"
                            name="keywords"
                            rules={[{ required: true, message: 'Por favor ingresa las claves.' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Guardar
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </AntDProvider>

    );

}
