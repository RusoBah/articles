'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';


// Интерфейс для описания структуры данных
interface Batch {
    name: string;
    ingested: string;
    url: string;
    page_count: number;
}

const App = () => {

    const [batches, setBatches] = useState<Batch[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://chroniclingamerica.loc.gov/batches.json');

                if (response.status === 200 && Array.isArray(response.data.batches)) {
                    setBatches(response.data.batches);
                } else {
                    throw new Error('batches не найдены или не являются массивом.');
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setError(`Ошибка: ${error.response?.status} - ${error.response?.data}`);
                } else {
                    setError(`Ошибка: ${error.message}`);
                }
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container w-9/12 mx-auto">
            <h1 className="text-3xl text-center mt-8 font-bold">Список батчей</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul className='mt-8 justify-center flex flex-wrap'>
                {batches.map((batch) => (
                    <li key={batch.page_count} className="p-2 m-2 w-1/4 h-[145px] hover:bg-blue-500 hover:ring-blue-500 hover:shadow-md group rounded-md p-3 -space-x-1.5 ring-1 ring-slate-200 shadow-sm"> 
                        <h2 className="cursor-default text-2xl hover:text-blue-200">Название: {batch.name || 'Нет данных'}</h2> 
                        <p className="cursor-default hover:text-blue-200">Дата: {batch.ingested.split('-')[0] || 'Нет данных'}</p>  
                        <p className="cursor-pointer truncate hover:text-blue-200"> <a href={batch.url}>Ссылка: {batch.url || 'Нет данных'}</a></p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;                                                                                                                     