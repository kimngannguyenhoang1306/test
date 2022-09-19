import {useEffect, useState} from 'react';

function Users() {
    const [users, setUsers] = useState([]);
    const [numOfNewUsers, setNumOfNewUsers] = useState(0);
    const [reload, setReload] = useState(true);
    const [changeUserList, setChangeUserList] = useState(new Set());

    useEffect(() => {
        fetch('http://localhost:4000/users')
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.log(err))
        setNumOfNewUsers(0);
        setReload(false);
        setChangeUserList(new Set());
    }, [reload]);

    const handleSearch = () => {
        const search = encodeURIComponent(document.getElementById('search').value);
        fetch(`http://localhost:4000/users?name=${search}`)
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.log(err))
    }

    const handleIsAddNewUsers = () => {
        setNumOfNewUsers(numOfNewUsers + 1);
    }

    const handleAddNewUsers = async () => {
        let newUsers = [];
        for (let i = 0; i < numOfNewUsers; i++) {
            let username = document.getElementById(`addUsername${i}`).value;
            let email = document.getElementById(`addEmail${i}`).value;
            let birthdate = document.getElementById(`addBirthdate${i}`).value;
            newUsers = await (username && email) ? newUsers.concat({username, email, birthdate}) : newUsers
        }
        console.log(newUsers)
        await fetch('http://localhost:4000/users', {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json'
              },
            'body': JSON.stringify({newUsers})
        })   
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
        setReload(true);
    }

    const handleChangeUsers = (key) => {
        setChangeUserList(changeUserList.add(key))
    }

    const handleUpdateUsers = async () => {
        let updateUsers = [...changeUserList].map((key) => {
            let username = document.getElementById(`username${key}`).innerText;
            let email = document.getElementById(`email${key}`).innerText;
            let birthdate = document.getElementById(`birthdate${key}`).innerText;
            return ({username, email, birthdate, 'id': users[key].id})
        })
        console.log(updateUsers)
        await fetch('http://localhost:4000/users/update', {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json'
              },
            'body': JSON.stringify({updateUsers})
        })   
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
        setReload(true);
    }

  return (
    <div className="App">
        <div>Search: <input id='search' onChange={handleSearch}></input></div>
        <table>
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Birthday</th>
                </tr>
            </thead>
            <tbody>
                {!reload && users.map((user, index) => {
                    return (
                        <tr key={index} onBlur={() => {handleChangeUsers(index)}}>
                            <td contentEditable id={`username${index}`}>{user.username}</td>
                            <td contentEditable id={`email${index}`}>{user.email}</td>
                            <td contentEditable id={`birthdate${index}`}>{user.birthdate ? user.birthdate.split('T')[0] : user.birthdate}</td>
                        </tr>
                    )
                })}

                {Array.from(Array(numOfNewUsers)).map((user, index) => {
                    return (
                        <tr key={index}>
                            <td><input id={`addUsername${index}`} type='text' required /></td>
                            <td><input id={`addEmail${index}`} type='email' required /></td>
                            <td><input id={`addBirthdate${index}`} type='date' pattern="\d{4}-\d{2}-\d{2}" placeholder='yyyy-mm-dd' /></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        <button onClick={handleIsAddNewUsers}>Click to add new users</button>
        <button onClick={handleAddNewUsers}>Add</button>
        <button onClick={handleUpdateUsers}>Click to update users</button>
    </div>
  );
}

export default Users;

