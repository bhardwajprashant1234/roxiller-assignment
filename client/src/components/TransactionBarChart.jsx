import React, { useState, useEffect } from 'react';
import apiClient from '../utils/apiClient';
import { Bar } from 'react-chartjs-2';
import Loader from './Loader';

const TransactionsBarChart = ({ month }) => {
  const [barChartData, setBarChartData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBarChartData = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get('/barchart', { params: { month } });
        setBarChartData(response.data);
      } catch (error) {
        console.error('Error fetching bar chart data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBarChartData();
  }, [month]);

  if (loading) {
    return <Loader />;
  }

  const chartData = {
    labels: barChartData.map((data) => `${data._id.min} - ${data._id.max}`),
    datasets: [
      {
        label: 'Number of Items',
        data: barChartData.map((data) => data.count),
        backgroundColor: 'rgba(75,192,192,0.6)',
      },
    ],
  };

  return (
    <div>
      <h3>Bar Chart for {month}</h3>
      <Bar data={chartData} />
    </div>
  );
};

export default TransactionsBarChart;