'use client';
import { Form, Input, Button, message } from 'antd';

export interface PromptType {
    initialData: {
        role: string;
        context: string;
        questions: string;
    }
    onSubmit: (prompt: {role: string, context: string, questions: string}) => void;
    isRunning: boolean;
}

export default function PromptForm({ initialData, onSubmit, isRunning }: PromptType) {

    const [form] = Form.useForm();

    const onFinishFailed = (errorInfo: any) => {
        message.error('Failed:' + errorInfo);
    };

    return (
        <>
            <Form form={form} onFinish={onSubmit} onFinishFailed={onFinishFailed} initialValues={initialData}>
                <Form.Item
                    label="Rol"
                    name="role"
                    rules={[{ required: true, message: 'Por favor ingresa el título.' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Contexto"
                    name="context"
                    rules={[{ required: true, message: 'Por favor ingresa el autor.' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Preguntas"
                    name="questions"
                    rules={[{ required: true, message: 'Por favor ingresa el resumen.' }]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={isRunning}>
                        {isRunning ? 'Procesando' : 'Procesar'}
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}