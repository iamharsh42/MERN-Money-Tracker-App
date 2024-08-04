import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [datetime, setDatetime] = useState("");
  const [description, setDescription] = useState("");

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

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
    const response = await fetch(`${API_BASE_URL}/transaction`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ name, description, datetime }),
    });

    if (response.ok) {
      console.log(response.json());
    }
  };

  return (
    <main>
      <h1>
        $400<span>.00</span>
      </h1>

      <form onSubmit={addNewTransaction}>
        <div className="basic">
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={"+200 new samsung tv"}
          />
          <input
            type="datetime-local"
            value={datetime}
            onChange={(event) => setDatetime(event.target.value)}
          />
        </div>
        <div className="description">
          <input
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder={"description"}
          />
        </div>
        <button type="submit">Add new transaction</button>
      </form>
      <div className="transactions">
        <div className="transaction">
          <div className="left">
            <div className="name">New Samsung TV</div>
            <div className="description">It was time for a new tv.</div>
          </div>
          <div className="right">
            <div className="price red">-$500</div>
            <div className="datetime">2024-08-03 12:38</div>
          </div>
        </div>
        <div className="transaction">
          <div className="left">
            <div className="name">Gig job new website</div>
            <div className="description">It was time for a new tv.</div>
          </div>
          <div className="right">
            <div className="price green">+$400</div>
            <div className="datetime">2024-08-03 12:38</div>
          </div>
        </div>
        <div className="transaction">
          <div className="left">
            <div className="name">New Iphone</div>
            <div className="description">It was time for a new tv.</div>
          </div>
          <div className="right">
            <div className="price red">-$900</div>
            <div className="datetime">2024-08-03 12:38</div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
