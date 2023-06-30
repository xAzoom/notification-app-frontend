import { useState, useEffect } from "react";
import request from "../client/api";

const Notification = ({ logInAccount }) => {
    const [data, setData] = useState([]);

    const refreshNotification = () => request('GET', 'https://127.0.0.1:9500/api/notifications?' + new URLSearchParams({
        accountId: logInAccount,
    }))
        .then(response => response.json())
        .then(response => setData(response))
        .catch(e => console.log(e));

    const toogleRead = (notificationId, currentRead) => request('POST', `https://127.0.0.1:9500/api/notifications/${notificationId}/${currentRead ? 'unread' : 'read'}`, {
        recipientId: logInAccount
    })
        .catch(e => console.log(e));

    useEffect(() => {
        const interval = setInterval(() => {
            refreshNotification();
        }, 1000);
        refreshNotification();
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <div className="list-group">
                {!data.length && 'Brak powiadomień'}
                {data.map(item => <a
                    href="#"
                    key={item.id}
                    className={"list-group-item list-group-item-action " + (!item.read && 'active')} aria-current="true"
                    onClick={() => toogleRead(item.id, item.read)}
                >
                    <b className="mb-1">{item.title}</b>
                    <p className="mb-1">{item.content}</p>
                </a>)}
            </div>
        </div>
    )
}

export default Notification; 