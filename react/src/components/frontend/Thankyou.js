import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function Thankyou() {
    return (
        <div>
            <div className="py-3 bg-warning">
                <div className="container">
                    <h6>Home / Thank you</h6>
                </div>
            </div>

            <div className="py-4">
                <div className="container">
                    <div class="col-md-12">
                        <div className="card text-center p-5">
                            <h4>Thanks for renting with RentTheTrend</h4>
                            <Link to="/collections">Continue renting </Link>

                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Thankyou;
