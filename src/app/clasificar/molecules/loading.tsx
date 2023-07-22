import { Spin } from "antd";

export default function Loading() {
    return (
        <div className=''>
        <div className='app-center w-full' style={{ height: 'calc(100vh - 300px)' }}>
            <div>
                <Spin size='large' />
            </div>

        </div>
        <h1 className='text-white text-center'>Cargando...</h1>
    </div>
    );
}