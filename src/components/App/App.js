import React from "react";

import './App.css';
import NewsList from "../NewsList/NewsList";

const App = (() => {
    return (
        <div className="App" data-test="component-app">
            <NewsList />
        </div>
    )
});

export default App;
