import './Admin.css';
import React, { useState, useEffect } from 'react';

const AdminDashboard = ({ token }) => {
    const [details, setDetails] = useState(null);
    const [isChargingCustomers, setIsChargingCustomers] = useState(false);
    const [customAmount, setCustomAmount] = useState(99);
    const [regularAmounts, setRegularAmounts] = useState([79, 59, 39, 19]);
    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch('https://stg.dhunjam.in/account/admin/4', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                if (data.status === 200) {
                    setDetails(data.data);
                    setIsChargingCustomers(data.data.charge_customers);
                    setCustomAmount(data.data.amount.category_6);
                    setRegularAmounts([
                        data.data.amount.category_7,
                        data.data.amount.category_8,
                        data.data.amount.category_9,
                        data.data.amount.category_10,
                    ]);
                } else {
                    console.error('Error fetching admin details');
                }
            } catch (error) {
                console.error('Error during API call:', error);
            }
        };

        if (token) {
            fetchDetails();
        }

    }, [token]);

    const handleCustomAmountChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setCustomAmount(value);
    };

    const handleRegularAmountChange = (index, e) => {
        const value = parseInt(e.target.value, 10);
        const newRegularAmounts = [...regularAmounts];
        newRegularAmounts[index] = value;
        setRegularAmounts(newRegularAmounts);
    };

    const handleSave = async () => {
        try {
            const response = await fetch('https://stg.dhunjam.in/account/admin/4', {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: {
                        category_6: customAmount,
                        category_7: regularAmounts[0],
                        category_8: regularAmounts[1],
                        category_9: regularAmounts[2],
                        category_10: regularAmounts[3],
                    },
                }),
            });

            const data = await response.json();

            if (data.status === 200) {
                setCustomAmount(data.data.amount.category_6);
                setRegularAmounts([
                    data.data.amount.category_7,
                    data.data.amount.category_8,
                    data.data.amount.category_9,
                    data.data.amount.category_10,
                ]);

                console.log('Prices updated successfully');
            } else {
                console.error('Error updating prices');
            }
        } catch (error) {
            console.error('Error during price update:', error);
        }
    };

    return (
        <div>
            <h2 className='title'>Social, Hebbal on Dhan Jam</h2>

            {details && (
                <div>
                    <h3 className='details'>Social: {details.name}</h3>
                    <h3 className='details'>Hebbal: {details.location}</h3>

                    <div className='songChange'>
                        <label className='songChange'>
                            Do you want to change your<br />
                            customers for requesting songs?
                            </label>
                            <input
                                type="checkbox"
                                checked={isChargingCustomers}
                                onChange={() => setIsChargingCustomers(!isChargingCustomers)}
                            /><label className='custom'>Yes</label>
                            <input
                                type="checkbox"
                            /><label className='custom'>No</label>
                        
                    </div>

                    {isChargingCustomers && (
                        <>
                            <label className='songRequest'>
                                Custom Song Request Amount:
                                <input
                                    type="number"
                                    value={customAmount}
                                    onChange={handleCustomAmountChange}
                                />
                            </label>

                            <h4>Regular song request amounts from high to low:</h4>
                            {regularAmounts.map((amount, index) => (
                                <label key={index}>
                                    Category {7 + index}:
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => handleRegularAmountChange(index, e)}
                                    />
                                </label>
                            ))}
                        </>
                    )}

                    <button onClick={handleSave} disabled={!isChargingCustomers}>
                        Save
                    </button>

                    {isChargingCustomers && (
                        <div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
