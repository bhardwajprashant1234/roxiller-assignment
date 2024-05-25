import React, { useState } from 'react';
import TransactionsTable from './components/TransactionsTable';
import TransactionsStatistics from './components/TransactionsStatistics';
import TransactionsBarChart from './components/TransactionsBarChart';
import TransactionsPieChart from './components/TransactionsPieChart';
import './App.css';

const App = () => {
  const [month, setMonth] = useState('March');

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  return (
    <div className="app">
      <h1>Transactions Dashboard</h1>
      <div className="month-selector">
        <label htmlFor="month">Select Month:</label>
        <select id="month" value={month} onChange={handleMonthChange}>
          <option value="January">January</option>
          <option value="February">February</option>
          {/* Add more options for the remaining months */}
        </select>
      </div>
      <TransactionsTable />
      <TransactionsStatistics month={month} />
      <TransactionsBarChart month={month} />
      <TransactionsPieChart month={month} />
    </div>
  );
};

export default App;