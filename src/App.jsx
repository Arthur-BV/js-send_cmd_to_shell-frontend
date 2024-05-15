import React, { useState } from 'react';
import axios from 'axios';

import logo from "./logo.svg";
import "./App.css";

const port = 8080;



function App() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [inputValue, setInputValue] = useState('ls -la');

    const handleChange = (event) => {
      setInputValue(event.target.value);
    };

    const apiCall = async () => {
      const cmd = inputValue;
      const url = `http://localhost:${port}/runcmd/${cmd}`;
      console.log(url);
      
      try {
        setLoading(true);
        const response = await axios.get(url);
        setData(response.data);
        setError(null)
      } catch (error) {
        setData(null);
        setError(error)
      } finally {
        setLoading(false);
      }
    };

    return (
        <>
          <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
            </header>
          </div>
          <div className="field">
            <input name="cmd" id="cmd" type="text" value={inputValue} onChange={handleChange} />
            <button className="buttons" onClick={apiCall}>RUN</button>
          </div>
          <div className="panel">
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
            {data && (
              <div>
                <p>Data from Server:</p>
                {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
                <pre>{data}</pre>
              </div>
            )}              
          </div>
        </>
    );
}

export default App;
