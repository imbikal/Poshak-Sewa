import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';

function Order() {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        let isMounted = true;
        document.title = "Orders";

        axios.get(`/api/admin/orders`).then((res) => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setOrders(res.data.orders);
                    setLoading(false);
                }
            }
        });

        return () => {
            isMounted = false;
        };
    }, []);

    const handleCancelOrder = (orderId) => {
        axios
            .delete(`/api/admin/orders/cancel/${orderId}`)
            .then((res) => {
                if (res.data.status === 200) {
                    // Order cancellation was successful, you may update the UI accordingly
                } else {
                    // Handle error if the cancellation request fails
                }
            })
            .catch((error) => {
                // Handle network or other errors here
            });
    };

    var display_orders = "";
    if (loading) {
        return <h4>Loading Orders...</h4>;
    } else {
        display_orders = orders.map((item) => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.tracking_no}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td>
                        <RouterLink to={`/admin/view-orders/${item.id}`} className="btn btn-success btn-sm">View</RouterLink>
                    </td>
                    <td>
                        <button onClick={() => handleCancelOrder(item.id)} className="btn btn-danger btn-sm">Cancel</button>
                    </td>
                </tr>
            );
        });
    }

    return (
        <div className="container px-4 mt-3">
            <div className="card">
                <div className="card-header">
                    <h4>Orders  </h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Tracking No.</th>
                                    <th>Phone No.</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                    <th>Cancel</th>
                                </tr>
                            </thead>
                            <tbody>{display_orders}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Order;
