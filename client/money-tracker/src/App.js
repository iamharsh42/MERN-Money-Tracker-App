import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [datetime, setDatetime] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState([]);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // useEffect(() => {
  //   getTransactions().then((transactions) => {
  //     setTransactions(transactions);
  //   });
  // }, [addNewTransaction]);

  const getTransactions = async () => {
    const response = await fetch(`${API_BASE_URL}/api/transactions`);
    return await response.json();
  };

  // function addNewTransaction(event) {
  //   event.preventDefault();
  //   const url = process.env.REACT_APP_API_BASE_URL + "/transaction";
  //   fetch(url, {
  //     method: "POST",
  //     headers: { "Content-type": "application/json" },
  //     body: JSON.stringify({ name, description, datetime }),
  //   }).then((response) => {
  //     response.json().then((json) => {
  //       console.log("result", json);
  //     });
  //   });
  // }

  const addNewTransaction = async (event) => {
    event.preventDefault();
    const price = name.split(" ")[0];
    const response = await fetch(`${API_BASE_URL}/api/transaction`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        price,
        name: name.substring(price.length + 1),
        description,
        datetime,
      }),
    });

    if (response.ok) {
      console.log(response.json());
      getTransactions().then((transactions) => {
        setTransactions(transactions);
      });
      setName("");
      setDescription("");
      setDatetime("");
    }
  };

  useEffect(() => {
    getTransactions().then((transactions) => {
      setTransactions(transactions);
    });
  }, []);

  let balance = 0;
  for (const transaction of transactions) {
    balance = balance + transaction.price;
  }

  balance = balance.toFixed(2);
  const fraction = balance.split(".")[1];
  balance = balance.split(".")[0];

  return (
    <div className="container">
      <h1 className="title">Mern Money Tracker</h1>
      <main>
        <h1>
          ${balance}
          <span>{fraction}</span>
        </h1>

        <form onSubmit={addNewTransaction}>
          <div className="basic">
            <input
              required
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder={"+200 new samsung tv"}
            />
            <input
              required
              type="datetime-local"
              value={datetime}
              onChange={(event) => setDatetime(event.target.value)}
            />
          </div>
          <div className="description">
            <input
              required
              type="text"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder={"description"}
            />
          </div>
          <button type="submit" onClick={console.log("clicked!")}>
            Add new transaction
          </button>
        </form>
        <div className="transactions">
          {transactions.length > 0 &&
            transactions.map((transaction) => (
              <div className="transaction">
                <div className="left">
                  <div className="name">{transaction.name}</div>
                  <div className="description">{transaction.description}</div>
                </div>
                <div className="right">
                  <div
                    className={
                      "price " + (transaction.price < 0 ? "red" : "green")
                    }
                  >
                    {transaction.price}
                  </div>
                  <div className="datetime">{transaction.datetime}</div>
                </div>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}

export default App;
