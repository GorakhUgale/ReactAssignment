import { useEffect, useState } from "react";
import axios from "axios";
import './coins.scss';
import ListItem from "./ListItem";

export type CoinType = {
    id: string;
    name: string;
    image: string;
    symbol: string;
    current_price: number;
    high_24h: number;
    low_24h: number;
}

const Coins = () => {
    const [coins, setCoins] = useState<CoinType[]>([]);
    const [currentPage, setcurrentPage] = useState(1);
    useEffect(() => {
        axios.get('https://api.coingecko.com/api/v3/coins/markets', {
            params: {
                vs_currency: "EUR",
                order: "market_cap_desc",
                per_page: "10",
                page: currentPage,
                sparkline: false
            }
        })
            .then(res => {
                setCoins(res.data);
            })
            .catch((error) => {
                console.log('Error', error.message);
                console.log(error.config);
            });
    }, [currentPage])
    return (
        <div className="main">
            <table className="table">
                <thead>
                    <tr>
                        <th className="left-align">Name</th>
                        <th className="left-align">Symbol</th>
                        <th className="right-align">Current Price</th>
                        <th className="right-align">High 24 hour Price</th>
                        <th className="right-align">Low 24 hour Price</th>
                    </tr>
                </thead>
                <tbody>
                    {coins.map(value => <ListItem coin={value} key={value.id} />)}
                </tbody>
            </table>
            <div className="pager">
                <div className="px-2">
                    <button onClick={() => setcurrentPage(currentPage - 1)} className={`previous ${currentPage === 1 ? 'inactiveLink' : ''}`}>&laquo; Previous</button>
                </div>
                <div className="px-2">
                    <button onClick={() => setcurrentPage(currentPage + 1)} className="next">Next &raquo;</button>
                </div>
            </div>
        </div>
    );
}

export default Coins;