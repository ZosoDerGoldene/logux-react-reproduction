    import React from 'react';
    import ReactDOM from 'react-dom';
    import './index.css';
    import App from './App';
    import reportWebVitals from './reportWebVitals';
    import {CrossTabClient, IndexedStore} from "@logux/client";
    import {useAuth, ClientContext} from "@logux/client/react";

    function Login() {
        let {isAuthenticationg, userId} = useAuth()
        return <div>only a test {userId}</div>
    }

    const client = new CrossTabClient({
        server: process.env.NODE_ENV === 'development'
            ? 'ws://localhost:31337'
            : 'wss://logux.example.com',
        subprotocol: '1.0.0',
        userId: 'anonymous',
        store: new IndexedStore(),
        token: ''
    })

    client.log.store.get().then((page) => console.log(page))
    ReactDOM.render(
      <React.StrictMode>
          <ClientContext.Provider value={client}>
                  <Login/>
          </ClientContext.Provider>
      </React.StrictMode>,
      document.getElementById('root')
    );

    // If you want to start measuring performance in your app, pass a function
    // to log results (for example: reportWebVitals(console.log))
    // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
    reportWebVitals();
