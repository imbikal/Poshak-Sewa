import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import  PieChart  from './PieChart';


function Dashboard() {
  
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  const [orders, setOrders] = useState([]);

  // const data = [
  //   { label: "Cod", payment_mode: "Cash on delivery" },
  //   { label: "Khalti", payment_mode: "Khalti payment" },
  // ];
  // const { userId } = useParams();
  // const [cityData, setCityData] = useState([]);
  // const [usersTotalPrice, setUsersTotalPrice] = useState([]);
  const [sales, setsales] = useState();
  // useEffect(() => {
  //   axios

  //     .get("/api/getUsersTotalPrice")
  //     .then((response) => {
  //       setUsersTotalPrice(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);

  useEffect(() => {
    axios
      .get("/api/total-sales")
      .then((response) => {
        setsales(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  console.log(sales);
  // console.log(usersTotalPrice);
  useEffect(() => {
    axios.get("/api/profile").then((response) => {
      if (response.status === 200) {
        setUser(response.data.user);
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {

    let isMounted = true;
    document.title = "Orders";

    axios.get(`/api/admin/orders`).then(res=>{
        if(isMounted)
        {
            if(res.data.status === 200)
            {
                setOrders(res.data.orders);
                setLoading(false);
            }
        }
    });
    return () => {
        isMounted = false
    };
}, []);

  // useEffect(() => {
  //   axiosClient(`/user/${userId}/city`)
  //     .then((response) => {
  //       setCityData(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, [userId]);

  // console.log(cityData);
  if (loading) {
    return <h4>Loading User Profile...</h4>;
  }
  let displayOrders = "";
  if (loading) {
    return <h4 className="text-center">View Orders loading.</h4>;
  } else {
    displayOrders =
      orders &&
      orders.map((item) => {
        return (
          <tr key={item.id}>
           <td className="px-4 py-2 border">{item.id}</td>
           <td className="px-4 py-2 border">{item.tracking_no}</td>
           <td className="px-4 py-2 border">{item.phone}</td>
           <td className="px-4 py-2 border">{item.user_id}</td>

           <td className="px-4 py-2 border">{item.email}</td>
           <td className="px-4 py-2 border">{item.payment_mode}</td>
            <td>
              <Link
                to={`/admin/view-orders/${item.id}`}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-sm transition-colors duration-300">
                view
              </Link>
            </td>
          </tr>
        );
      });
    }
  return (
    <div>
     
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="grid grid-cols-3 gap-4 mb-4"></div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <h2 className="text-2xl font-semibold mb-4">City Data</h2>
              <ul>
                {cityData.map((city, index) => (
                  <li key={index} className="text-lg">
                    {city}
                  </li>
                ))}
              </ul>
            </div> */}
            <div><PieChart/></div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28">
              
              <h2>User Profile :  {user.name} </h2>
            </div>
           
            <div className="grid gap-4 grid-cols-2">
              <div className="bg-gray-200 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Total Quantity</h2>
                <p className="text-lg">{sales.total_qty}</p>
              </div>

              <div className="bg-gray-200 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Total Price</h2>
                <p className="text-lg">Nrs.{sales.total_price}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center h-88 mb-4 rounded bg-gray-50">
  <div className="text-2xl text-gray-400 dark:text-gray-500 overflow-x-auto w-full">
    <table className="table-auto border-collapse border border-gray-300 w-full">
      <thead>
        <tr>
          <th className="px-4 py-2 bg-gray-100 border">ID</th>
          <th className="px-4 py-2 bg-gray-100 border">Tracking No.</th>
          <th className="px-4 py-2 bg-gray-100 border">Phone No.</th>
          <th className="px-4 py-2 bg-gray-100 border">User Id</th>
          <th className="px-4 py-2 bg-gray-100 border">Email</th>
          <th className="px-4 py-2 bg-gray-100 border">Payment Mode</th>
          <th className="px-4 py-2 bg-gray-100 border">Action</th>
        </tr>
      </thead>
                <tbody>{displayOrders}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
   
  )
}
export default Dashboard;
