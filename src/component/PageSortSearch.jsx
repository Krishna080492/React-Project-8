import React, { useEffect, useState } from "react";

function PageeSortSearch() {
  let [user, setUser] = useState({});
  let [list, setList] = useState([]);
  let [index, setIndex] = useState(-1); //edit
  let [currentPage, setCurrentPage] = useState(1); //paggignation n page start with 1
  let [symbol, setSymbol] = useState(""); //sorting
  let [search, setSearch] = useState(""); //searching

  let itemPerPage = 3; //per page 3 data can be show

  useEffect(() => {
    let oldList = JSON.parse(localStorage.getItem("user")) || [];
    setList(oldList);
  }, []);

  let handleInput = (e) => {
    let { name, value } = e.target;
    let newUser = { ...user, [name]: value };
    setUser(newUser);
    console.log(newUser);
  };

  let handleSubmit = (e) => {
    e.preventDefault();

    let newList;

    if (index != -1) {
      list[index] = user;
      newList = [...list];
      setIndex(-1);
    } else {
      newList = [...list, user];
    }
    setList(newList);
    // console.log(newList);
    localStorage.setItem("user", JSON.stringify(newList));
    setUser({});
  };

  // sort
  let sortBy = (type) => {
    let newlist = [];

    if (type == "name") {
      if (symbol == "" || symbol == "^") {
        newlist = list.sort((a, b) => b.name.localeCompare(a.name));
        setSymbol("v");
      } else {
        newlist = list.sort((a, b) => a.name.localeCompare(b.name));
        setSymbol("^");
      }
    } else if (type == "email") {
      if (symbol == "" || symbol == "^") {
        newlist = list.sort((a, b) => b.email.localeCompare(a.email));
        setSymbol("v");
      } else {
        newlist = list.sort((a, b) => a.email.localeCompare(b.email));
        setSymbol("^");
      }
    } else if (type == "password") {
      if (symbol == "" || symbol == "^") {
        newlist = list.sort((a, b) => b.password.localeCompare(a.password));
        setSymbol("v");
      } else {
        newlist = list.sort((a, b) => a.password.localeCompare(b.password));
        setSymbol("^");
      }

      setList(newlist);
    }
  };

  // search
  let handleSearch = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };

  const filteredList = list.filter((val) => {
    if (search === "") {
      return val;
    } else if (
      val.name.toLowerCase().includes(search.toLowerCase()) ||
      val.email.toLowerCase().includes(search.toLowerCase())
    ) {
      return val;
    }
    return null;
  });

   // Pagination logic based on the filtered list
   const indexOfLastItem = currentPage * itemPerPage; //at one page how many data u want to see (1*3=3)
   const indexOfFirstItem = indexOfLastItem - itemPerPage; //data can store in array format so want index value (3-3=0)
   const currentItems = filteredList.slice(indexOfFirstItem, indexOfLastItem); //new record store after slice
   const totalPage = Math.ceil(filteredList.length / itemPerPage); //total page calculation
 

  let deleteData = (pos) => {
    let actualIndex = indexOfFirstItem + pos; // Calculate the actual index
    list.splice(actualIndex, 1);
    let newList = [...list];
    setList(newList);
    localStorage.setItem("user", JSON.stringify(newList));
  };

  let editData = (pos) => {
    let actualIndex = indexOfFirstItem + pos; // Calculate the actual index
    let editUser = list[actualIndex];
    setUser(editUser);
    setIndex(actualIndex);
  };

  return (
    <>
      <h2>User Data (pagination)</h2>
      <form method="post" onSubmit={handleSubmit}>
        <label htmlFor="">Name : </label>
        <input
          type="text"
          name="name"
          onChange={handleInput}
          value={user.name || ""}
        />
        <br />
        <br />
        <label htmlFor="">Email : </label>
        <input
          type="text"
          name="email"
          onChange={handleInput}
          value={user.email || ""}
        />
        <br />
        <br />
        <label htmlFor="">Password : </label>
        <input
          type="text"
          name="password"
          onChange={handleInput}
          value={user.password || ""}
        />
        <br />
        <br />
        <input type="submit" value={index != -1 ? "Update" : "Submit"} />
      </form>{" "}
      <br />
      <br />
      <div style={{ textAlign: "center" }}>
        <input
          type="text"
          name=""
          placeholder="Search"
          onChange={handleSearch}
        />
      </div>
      <br />
      <br />
      <table border={1} align="center" cellPadding={10}>
        <thead>
          <tr>
            <th>
              <button onClick={() => sortBy("name")}>Name {symbol}</button>{" "}
              {/* Sorting */}
            </th>
            <th>
              <button onClick={() => sortBy("email")}>Email {symbol}</button>
            </th>
            <th>
              <button onClick={() => sortBy("password")}>
                Password {symbol}
              </button>
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* list.map((v,i)=>())     without pagignation */}
          {currentItems.map((v, i) => (
              <tr key={i}>
                <td>{v.name}</td>
                <td>{v.email}</td>
                <td>{v.password}</td>
                <td>
                  <button
                    onClick={() => deleteData(i)}
                    style={{ marginRight: "10px" }}
                  >
                    Delete
                  </button>
                  <button onClick={() => editData(i)}>Edit</button>
                </td>
              </tr>
            ))}
          <tr>
            <td colSpan={4}>
              {currentPage > 1 ? ( //previous button code
                <button onClick={() => setCurrentPage(currentPage - 1)}>
                  Previous
                </button>
              ) : (
                ""
              )}
              {[...Array(totalPage)].map(
                (
                  _,
                  index //page can shows in array
                ) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={currentPage == index + 1 ? "active" : ""}
                    style={{ margin: "0px 5px" }}
                  >
                    {index + 1}
                  </button>
                )
              )}
              {currentPage < totalPage ? ( //next button code
                <button onClick={() => setCurrentPage(currentPage + 1)}>
                  Next
                </button>
              ) : (
                ""
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default PageeSortSearch;
