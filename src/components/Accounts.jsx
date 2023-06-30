import { useEffect, useState } from "react";
import request from "../client/api";

const Accounts = ({ currentAccount, onSelectCurrentAccount, refresh=5000 }) => {
    const [data, setData] = useState([]);

    const refreshAccounts = () => request('GET', 'https://127.0.0.1:9500/api/accounts')
        .then(response => response.json())
        .then(response => setData(response))
        .catch(e => console.log(e));

    useEffect(() => {
        const interval = setInterval(() => {
            refreshAccounts();
        }, refresh);
        refreshAccounts();
        return () => clearInterval(interval);
    }, []);

    return <div>
        <div className="list-group">
            {data.map(item =>
                <a
                    href="#"
                    key={item.id}
                    onClick={() => { onSelectCurrentAccount(item.id); }}
                    className={"list-group-item list-group-item-action " + (currentAccount === item.id && "active")}
                    aria-current="true"
                >
                    <p className="mb-1">{item.name}</p>
                </a>
            )}
        </div>
    </div>
}

export default Accounts;