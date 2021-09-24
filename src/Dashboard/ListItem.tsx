import { Fragment } from "react";
import { useHistory } from "react-router";
import { CoinType } from "./Coins";
import './coins.scss';

interface IProps {
    coin: CoinType
}

const ListItem: React.FC<IProps> = (props) => {
    const { coin: item } = props;

    const history = useHistory();
    const handleRowClick = (row: CoinType) => {
        history.push(`/details/${row.id}`);
    }

    return (
        <Fragment>
            <tr onClick={() => handleRowClick(item)}>
                <td className="left-align"><img src={item.image} alt={item.name} width="15" height="15" /> {item.name}</td>
                <td className="left-align">{item.symbol}</td>
                <td className="right-align">{item.current_price}</td>
                <td className="right-align">{item.high_24h}</td>
                <td className="right-align">{item.low_24h}</td>
            </tr>
        </Fragment>
    )
}

export default ListItem;