'use client';
export interface ProgressBarType {
    total: number;
    current: number;
    title: string;
}

export default function ProgressBar ({total, current, title}: ProgressBarType) {

    return(
        <>
            <p>[{current}/{total}]: {title}</p>
            <div className="w-full bg-gray-200 rounded">
                <div
                    className="h-4 bg-indigo-500 rounded"
                    style={{ width: `${current*100/total}%` }}
                ></div>
            </div>
        </>
    )
    
}