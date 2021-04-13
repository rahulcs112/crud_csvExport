import logo from './logo.svg';
import './App.css';
import UserLists from "./components/UserLists";
import UserAdd from "./components/UserAdd";
import UpdateUser from "./components/UpdateUser";
import { useState } from 'react';

function App() {

  const [updateUserId,setUpdateUserId] = useState(0);
  const [listUpdated,setListUpdated] = useState(0);
  return (
    <div className="App">
      {updateUserId === 0 ? <UserAdd setListUpdated={setListUpdated} /> : <UpdateUser updateUserId={updateUserId} setListUpdated={setListUpdated} setUpdateUserId={setUpdateUserId}/> }
      
      <UserLists setUpdateUserId={setUpdateUserId} listUpdated={listUpdated} updateUserId={updateUserId}/>
    </div>
  );
}

export default App;
