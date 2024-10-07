import React, { useEffect, useState } from 'react'

function Sorting() {

  let [user, setUser] = useState({});
  let [list, setList] = useState([]);
  let [symbol, setSymbol] = useState('');


  useEffect(() => {
    let oldList = JSON.parse(localStorage.getItem('user')) || [];
    setList(oldList);
  }, [])

  let handleInput = (e) => {
    let { name, value } = e.target
    // console.log(e.target.value);
    let newUser = { ...user, [name]: value }
    setUser(newUser);
    // console.log(newUser);
  }

  let handleSubmit = (e) => {
    e.preventDefault();
    let newList = [...list, user]
    setList(newList);
    // console.log(newList);
    localStorage.setItem('user', JSON.stringify(newList));
    setUser({})
  }

  let sortBy = (type) => {
    let newlist = [];

    if (type == 'name') {
      if (symbol == '' || symbol == '^') {
        newlist = list.sort((a, b) => b.name.localeCompare(a.name));
        setSymbol('v')
      } else {
        newlist = list.sort((a, b) => a.name.localeCompare(b.name));
        setSymbol('^');
      }
    } else if (type == 'email') {
      if (symbol == '' || symbol == '^') {
        newlist = list.sort((a, b) => b.email.localeCompare(a.email))
        setSymbol('v');
      } else {
        newlist = list.sort((a, b) => a.email.localeCompare(b.email))
        setSymbol('^')
      }
    } else if (type == 'password') {
      if (symbol == '' || symbol == '^') {
        newlist = list.sort((a, b) => b.password.localeCompare(a.password))
        setSymbol('v');
      } else {
        newlist = list.sort((a, b) => a.password.localeCompare(b.password))
        setSymbol('^')
      }

      setList(newlist);
    }
  }
  return (
    <>
      <h2 style={{ marginTop: "50px" }}>User Data (Sorting)</h2>
      {/* <form method="post" onSubmit={handleSubmit}>
        <label htmlFor="">Name : </label>
        <input type="text" name='name' onChange={handleInput} value={user.name || ''} /><br /><br />
        <label htmlFor="">Email : </label>
        <input type="text" name='email' onChange={handleInput} value={user.email || ''} /><br /><br />
        <label htmlFor="">Password : </label>
        <input type="text" name='password' onChange={handleInput} value={user.password || ''} /><br /><br />
        <input type="submit" value="Submit" />
      </form><br /><br /> */}

      <table border={1} align='center' cellPadding={10}>
        <thead>
        <tr>
            <td>
              <button onClick={() => sortBy('name')}>Name {symbol}</button>
            </td>
            <td>
              <button onClick={() => sortBy('email')}>Email {symbol}</button>
            </td>
            <td><button onClick={() => sortBy('password')}>Password {symbol}</button></td>
          </tr>
        </thead>
        <tbody>
          
          {list.map((v, i) => (
            <tr key={i}>
              <td>{v.name}</td>
              <td>{v.email}</td>
              <td>{v.password}</td>
            </tr>
          ))
          }
        </tbody>
      </table>
    </>
  )
}

export default Sorting