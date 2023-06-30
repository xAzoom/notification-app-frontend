import { useState, useEffect } from "react";
import request from "../client/api";

const Messages = ({ currentRecipientId, logInAccount }) => {
    const [content, setContent] = useState('');
    const [data, setData] = useState([]);

    const refreshMessages = (currentRecipientId) => currentRecipientId && request('GET', 'https://127.0.0.1:9500/api/messages?' + new URLSearchParams({
        firstAccount: logInAccount,
        secondAccount: currentRecipientId,
    }))
        .then(response => response.json())
        .then(response => setData(response))
        .catch(e => console.log(e));

    const sendMessages = (currentRecipientId) => currentRecipientId && request('POST', 'https://127.0.0.1:9500/api/messages', {
        sender: logInAccount,
        recipients: [currentRecipientId],
        content: content
    })
        .catch(e => console.log(e));

    useEffect(() => {
        const interval = setInterval(() => {
            refreshMessages(currentRecipientId);
        }, 1000);
        refreshMessages(currentRecipientId);
        return () => clearInterval(interval);
    }, [currentRecipientId]);

    const handleKeyDown = event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessages(currentRecipientId);
            setContent('');
        }
    };

    const onClickSend = () => {
        sendMessages(currentRecipientId);
        setContent('');
    };

    return (
        !currentRecipientId
            ? <h5>Wybierz osobę z którą chcesz porozmawiać.</h5>
            : <div>
                <div className="list-group">
                    {data.map(item => <a href="#" key={item.id} className="list-group-item list-group-item-action" aria-current="true">
                        <h5 className="mb-1">{item.senderName}</h5>
                        <p className="mb-1">{item.content}</p>
                    </a>)}
                </div>
                <div className="mt-3">
                    <textarea
                        onChange={event => setContent(event.target.value)}
                        onKeyDown={handleKeyDown}
                        value={content}
                        className="form-control"
                        rows="3"
                    ></textarea>
                    <div className="d-flex justify-content-end">
                        <button type="button" onClick={onClickSend} className="btn btn-primary mt-3">Send</button>
                    </div>
                </div>
            </div>
    )
}

export default Messages;