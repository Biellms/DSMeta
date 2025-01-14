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

            console.log(sdate + " e " + edate);

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
            <h2 className="dsmeta-sales-title">Tabela de Vendas</h2>
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
                            <th className="show576">Data</th>
                            <th>Vendedor</th>
                            <th className="show992">Visitas</th>
                            <th className="show992">Vendas</th>
                            <th>Total</th>
                            <th>Notificar</th>
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
                                                <NotificationButton />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <>
                                    <tr>
                                        <td className="show992">#341</td>
                                        <td className="show576">23/07/2024</td>
                                        <td>Bruce Wayne</td>
                                        <td className="show992">54</td>
                                        <td className="show992">26</td>
                                        <td>$ 86300.00</td>
                                        <td>
                                            <div className="dsmeta-red-btn-container">
                                                <NotificationButton />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="show992">#214</td>
                                        <td className="show576">11/03/2025</td>
                                        <td>Clark Kent</td>
                                        <td className="show992">34</td>
                                        <td className="show992">17</td>
                                        <td>R$ 66400.00</td>
                                        <td>
                                            <div className="dsmeta-red-btn-container">
                                                <NotificationButton />
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