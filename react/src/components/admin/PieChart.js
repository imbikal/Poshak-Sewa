import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';

export const options = {
  title: "Products",
};

function PieChart() {
  const [loading, setLoading] = useState(true);
  const [viewProduct, setProduct] = useState([]);

  useEffect(() => {
    let isMounted = true;

    axios.get('/api/view-product')
      .then((res) => {
        if (isMounted) {
          if (res.data.status === 200) {
            setProduct(res.data.products);
            setLoading(false);
          }
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const chartData = [
    ["Task", "Hours per Day"],
    ...viewProduct.map(item => [item.meta_title, item.id])
  ];

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Chart
          chartType="PieChart"
          data={chartData}
          options={options}
          width={"100%"}
          height={"400px"}
          loader={<div>Loading Chart...</div>} // Add a loader element
        />
      )}
    </div>
  );
}

export default PieChart;