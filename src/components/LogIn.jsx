import { useState } from "react";
import Accounts from "./Accounts";
import request from "../client/api";

const LogIn = ({ logInAccount, setLogInAccount }) => {
    const [name, setName] = useState('');

    const onClickAddButton = () => {
        request('POST', 'https://127.0.0.1:9500/api/accounts', {
            name: name
        })
            .then(response => console.log(response));
    }

    return (<div>
        <h3>Logowanie i Tworzenie kont</h3>
        <p>Stwórz konto, a następnie wybierz je z listy, aby się zalogować.</p>
        <Accounts currentAccount={logInAccount} onSelectCurrentAccount={setLogInAccount} refresh={1000}/>
        <div className="d-flex mt-3">
            <input onChange={event => setName(event.target.value)} value={name} type="text" className="form-control"></input>
            <button onClick={onClickAddButton} type="button" className="btn btn-primary">Add</button>
        </div>

    </div>)
}

export default LogIn;