import React, { useState, useEffect } from 'react';
import apiClient from '../utils/apiClient';
import Loader from './Loader';

const TransactionsPieChart = ({ month }) => {
  const [pieChartData, setPieChartData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPieChartData = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get('/piechart', { params: { month } });
        setPieChartData(response.data);
      } catch (error) {
        console.error('Error fetching pie chart data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPieChartData();
  }, [month]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h3>Pie Chart for {month}</h3>
      <div>
        {pieChartData.map((data, index) => (
          <div key={index}>
            <span>{`${data._id}: `}</span>
            <span>{data.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionsPieChart;