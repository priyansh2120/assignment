"use client";

import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartData } from 'chart.js';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const API_KEY = 'CG-SdC7w5bkdz7CfT5rS7YbWpBC';

const getMarketChartData = async (coin: string) => {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=inr&days=2`, {
        headers: { accept: 'application/json', 'x-cg-demo-api-key': API_KEY },
    });
    return response.data;
};

const CoinChart = ({ selectedCoins }: { selectedCoins: string[] }) => {
    const [chartData, setChartData] = useState<ChartData<'line'>>({
        labels: [],
        datasets: [],
    });

    useEffect(() => {
        const fetchChartData = async () => {
            const data = await Promise.all(selectedCoins.map((coin) => getMarketChartData(coin)));

            const labels = data[0].prices.map((price: [number, number]) => new Date(price[0]).toLocaleString());

            const datasets = data.map((coinData, index) => ({
                label: selectedCoins[index],
                data: coinData.prices.map((price: [number, number]) => price[1]),
                fill: false,
                borderColor: `hsl(${(index * 60) % 360}, 100%, 50%)`,
            }));

            setChartData({
                labels,
                datasets,
            });
        };

        if (selectedCoins.length) {
            fetchChartData();
        }
    }, [selectedCoins]);

    return (
        <div className='w-full'>
            <Line data={chartData} />
        </div>
    );
};

export default CoinChart;
