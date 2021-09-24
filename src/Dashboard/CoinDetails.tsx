import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from 'axios';
import './coins.scss';

export type CoinDetailsType = {
    name: string;
    symbol: string;
    hashing_algorithm: string;
    description: {
        en: string;
    };
    market_data: {
        current_price: {
            eur: number
        }
    };
    links: {
        homepage: []
    };
    genesis_date: string;
}

interface IProps { }
interface ParamTypes {
    id?: string
}

const CoinDetails: React.FC<IProps> = (props) => {
    const { id } = useParams<ParamTypes>();
    const [coinDetails, setCoinDetails] = useState<any>();

    useEffect(() => {
        axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
            .then(res => {
                setCoinDetails(res.data);
            })
            .catch((error) => {
                console.log('Error', error.message);
                console.log(error.config);
            });
    }, [id]);

    return (
        <div className="main">
            {coinDetails &&
                <div className="details">
                    <div className="name">{coinDetails?.name}
                        <small className="nameSymbol">{coinDetails?.symbol}</small>
                    </div>
                    <div className="group">
                        <div className="w-1-4">
                            <div className="title">Hashing Algorithm</div>
                            <div>{coinDetails?.hashing_algorithm ?? "NA"}</div>
                        </div>
                        <div className="w-1-4">
                            <div className="title">Market Cap in Euro</div>
                            <div>{coinDetails?.market_data.current_price.eur ?? "NA"}</div>
                        </div>
                        <div className="w-1-4">
                            <div className="title">Genesis Date</div>
                            <div>{coinDetails?.genesis_date ?? "NA"}</div>
                        </div>
                        <div className="w-1-4">
                            <div className="title">Home Page</div>
                            <div>{coinDetails?.links?.homepage.length > 0 ? coinDetails?.links?.homepage?.map((value: string) => <div>{value}</div>) : "NA"}</div>
                        </div>
                    </div>
                    <div className="title">Description</div>
                    <div dangerouslySetInnerHTML={{ __html: coinDetails?.description.en }} />
                </div>
            }
        </div>
    )
}

export default CoinDetails;