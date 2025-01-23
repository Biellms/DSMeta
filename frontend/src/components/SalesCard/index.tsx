import NotificationButton from '../NotificationButton'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './styles.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/request';
import { Sale } from '../../models/sale';
import icon from '../../../src/assets/img/reset.svg'

function SalesCard() {
    const max = new Date(2024, 6, 1); // July is 6 (zero-based) - Date based on the maximum value in the DSMeta database
    const min = new Date(new Date(max).setDate(max.getDate() - 365));

    const [startDate, setStartDate] = useState<Date | null>(min);
    const [endDate, setEndDate] = useState<Date | null>(max);

    const [sales, setSales] = useState<Sale[]>([])

    useEffect(() => {
        if (startDate && endDate) {
            const sdate = startDate.toISOString().slice(0, 10);
            const edate = endDate.toISOString().slice(0, 10);

            axios.get(`${BASE_URL}/sales?minDate=${sdate}&maxDate=${edate}`)
                .then(response => setSales(response.data.content));
        }
    }, [startDate, endDate]);

    const resetDates = () => {
        setStartDate(min);
        setEndDate(max);
    };

    return (
        <div className="dsmeta-card">
            <h2 className="dsmeta-sales-title">Sales List</h2>
            <hr />
            <br />
            <div className='dsmeta-box-date'>
                <div className="dsmeta-form-control-container">
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        className="dsmeta-form-control"
                        dateFormat="dd/MM/yyyy"
                    />
                </div>
                -
                <div className="dsmeta-form-control-container">
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        className="dsmeta-form-control"
                        dateFormat="dd/MM/yyyy"
                    />
                </div>
                <div className="dsmeta-red-btn" onClick={resetDates}>
                    <img src={icon} alt="Resetar"/>
                </div>
            </div>

            <div>
                <table className="dsmeta-sales-table">
                    <thead>
                        <tr>
                            <th className="show992">ID</th>
                            <th className="show576">Date</th>
                            <th>Seller</th>
                            <th className="show992">Visited</th>
                            <th className="show992">Deals</th>
                            <th>Amount</th>
                            <th>Notify</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sales.length > 0 ? (
                                sales.map(sale => (
                                    <tr key={sale.id}>
                                        <td className="show992">#{sale.id}</td>
                                        <td className="show576">{new Date(sale.date).toLocaleDateString()}</td>
                                        <td>{sale.sellerName}</td>
                                        <td className="show992">{sale.visited}</td>
                                        <td className="show992">{sale.deals}</td>
                                        <td>$ {sale.amount.toFixed(2)}</td>
                                        <td>
                                            <div className="dsmeta-red-btn-container">
                                                <NotificationButton saleId={sale.id}/>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <>
                                    <tr>
                                        <td className="show992">#341</td>
                                        <td className="show576">29/01/2024</td>
                                        <td>Bruce Wayne</td>
                                        <td className="show992">54</td>
                                        <td className="show992">26</td>
                                        <td>$ 86300.00</td>
                                        <td>
                                            <div className="dsmeta-red-btn-container">
                                                <NotificationButton saleId={1}/>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="show992">#214</td>
                                        <td className="show576">11/03/2025</td>
                                        <td>Clark Kent</td>
                                        <td className="show992">34</td>
                                        <td className="show992">17</td>
                                        <td>$ 66400.00</td>
                                        <td>
                                            <div className="dsmeta-red-btn-container">
                                                <NotificationButton saleId={2}/>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="show992">#78</td>
                                        <td className="show576">10/07/2024</td>
                                        <td>Barry Allen</td>
                                        <td className="show992">50</td>
                                        <td className="show992">23</td>
                                        <td>$ 75400.00</td>
                                        <td>
                                            <div className="dsmeta-red-btn-container">
                                                <NotificationButton saleId={3}/>
                                            </div>
                                        </td>
                                    </tr>
                                </>
                            )
                        }
                    </tbody>

                </table>
            </div>

        </div>
    )
}

export default SalesCard