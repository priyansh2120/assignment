import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartData } from 'chart.js';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const API_KEY = 'CG-SdC7w5bkdz7CfT5rS7YbWpBC';

const getMarketChartData = async (coin: string) => {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=inr&days=2`, {
        headers: { accept: 'application/json', 'x-cg-demo-api-key': API_KEY }
    });
    return response.data;
};

const CoinChart = ({ selectedCoins }: { selectedCoins: string[] }) => {
    const [chartData, setChartData] = useState<ChartData<'line'>>({
        labels: [],
        datasets: []
    });

    useEffect(() => {
        const fetchChartData = async () => {
            const data = await Promise.all(selectedCoins.map(coin => getMarketChartData(coin)));

            // Extract and sort unique timestamps
            const timestamps = Array.from(new Set(data.flatMap(coinData => coinData.prices.map((price: any) => price[0])))).sort((a, b) => a - b);

            // Interpolate missing data by carrying forward the last known value
            const datasets = data.map((coinData, index) => {
                const priceMap = new Map(coinData.prices.map((price: any) => [price[0], price[1]]));
                let lastKnownPrice = coinData.prices[0][1];
                const interpolatedData = timestamps.map(timestamp => {
                    if (priceMap.has(timestamp)) {
                        lastKnownPrice = priceMap.get(timestamp);
                    }
                    return { x: new Date(timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }), y: lastKnownPrice };
                });
                return {
                    label: selectedCoins[index],
                    data: interpolatedData,
                    borderColor: ['red', 'blue', 'green'][index],
                    fill: false
                };
            });

            setChartData({
                labels: timestamps.map(timestamp => new Date(timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })),
                datasets
            });
        };

        if (selectedCoins.length > 0) {
            fetchChartData();
        } else {
            setChartData({
                labels: [],
                datasets: []
            });
        }
    }, [selectedCoins]);

    return (
        <div>
            <Line
                data={chartData}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top'
                        },
                        title: {
                            display: true,
                            text: 'Cryptocurrency Prices (Hourly)'
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Time (HH:MM)'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Price (INR)'
                            }
                        }
                    }
                }}
            />
        </div>
    );
};

export default CoinChart;
