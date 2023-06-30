import { useState } from 'react'
import './App.css'
import Accounts from './components/Accounts'
import Messages from './components/Messages'
import Notification from './components/Notification'
import LogIn from './components/LogIn'

function App() {
  const [currentRecipientId, setCurrentRecipientId] = useState(null);
  const [logInAccount, setLogInAccount] = useState(null);

  return (
    <div className='container-xxl'>
      <div className="row">
        {logInAccount
          ?
          <>
            <div className="col-md-3">
              <Accounts currentAccount={currentRecipientId} onSelectCurrentAccount={setCurrentRecipientId} />
            </div>
            <div className="col-md-6">
              <Messages currentRecipientId={currentRecipientId} logInAccount={logInAccount} />
            </div>
            <div className="col-md-3">
              <Notification logInAccount={logInAccount}/>
            </div>
          </>
          : <div className="offset-md-4 col-md-4"><LogIn logInAccount={logInAccount} setLogInAccount={setLogInAccount}/></div>}
      </div>
    </div>
  )
}

export default App
