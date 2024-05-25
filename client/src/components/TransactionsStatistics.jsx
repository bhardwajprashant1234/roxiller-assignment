import React, { useState, useEffect } from 'react';
import apiClient from '../utils/apiClient';
import Loader from './Loader';

const TransactionsStatistics = ({ month }) => {
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStatistics = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get('/statistics', { params: { month } });
        setStatistics(response.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, [month]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h3>Statistics for {month}</h3>
      <p>Total Sale Amount: {statistics.totalSaleAmount || 0}</p>
      <p>Total Sold Items: {statistics.totalSoldItems || 0}</p>
      <p>Total Not Sold Items: {statistics.totalNotSoldItems || 0}</p>
    </div>
  );
};

export default TransactionsStatistics;