import './App.css';

import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route

} from "react-router-dom";


const App = ()=> {

  const [progress,setProgress] = useState(0)


    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            color='#f11946'
            progress={progress}
            height={4}


          />
          <Routes>
            <Route exact path="/" element={<News setProgress={setProgress} key="general" category="general" />}></Route>
            <Route exact path="/business" element={<News setProgress={setProgress} key="business" category="business" />}></Route>
            <Route exact path="/entertainment" element={<News setProgress={setProgress} key="entertainment" category="entertainment" />}></Route>
            <Route exact path="/health" element={<News setProgress={setProgress} key="health" category="health" />}></Route>
            <Route exact path="/science" element={<News setProgress={setProgress} key="science" category="science" />}></Route>
            <Route exact path="/sports" element={<News setProgress={setProgress} key="sports" category="sports" />}></Route>
            <Route exact path="/technology" element={<News setProgress={setProgress} key="technology" category="technology" />}></Route>
          </Routes>
        </Router>
      </div>

    )
  
}

export default App;

