import React, { useEffect, useState } from 'react'

function Searching() {

  let [user, setUser] = useState({});
  let [list, setList] = useState([]);
  let [search, setSearch] = useState('');


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
  let handleSearch = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  }

  let deleteData = (pos) => {
    list.splice(pos, 1);
    let newList = [...list];
    setList(newList);
    localStorage.setItem('user', JSON.stringify(newList));
  }

  let editData = (pos) => {
    let editUser = list[pos];
    setUser(editUser);
    setIndex(pos)
  }

  return (
    <>
      <h2 style={{ marginTop: "50px" }}>User Data (Searching)</h2>
      <form method="post" onSubmit={handleSubmit}>
        <label htmlFor="">Name : </label>
        <input type="text" name='name' onChange={handleInput} value={user.name || ''} /><br /><br />
        <label htmlFor="">Email : </label>
        <input type="text" name='email' onChange={handleInput} value={user.email || ''} /><br /><br />
        <label htmlFor="">Password : </label>
        <input type="text" name='password' onChange={handleInput} value={user.password || ''} /><br /><br />
        <input type="submit" value="Submit" />
      </form><br /><br />
      <div style={{ textAlign: "center" }}>
        <input type="text" name="" placeholder='Search' onChange={handleSearch} />
      </div>
      <br /><br />
      <table border={1} align='center' cellPadding={10}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {list.filter((val, idx) => {
            if (search == '') {
              return val
            } else if (val.name.toLocaleLowerCase().match(search.toLocaleLowerCase())) {
              return val
            } else if (val.email.toLocaleLowerCase().match(search.toLocaleLowerCase())) {
              return val
            }
          })
            .map((v, i) => (
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

export default Searching