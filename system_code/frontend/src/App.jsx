import './App.css';
import React, { Component } from 'react';
import Welcome from './pages/Welcome';
import Header from './pages/Header';
import LoginPage from './pages/LoginPage';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import StoryPage from './pages/StoryPage';
import StoryEndingPage from './pages/StoryEndingPage';
import ThoughtsPage from './pages/ThoughtsPage';
import HistoryPage from './pages/HistoryPage';
import ScriptDescription from "./pages/ScriptDescription.jsx";
import WdigetSelectionPage from './pages/WdigetSelectionPage.jsx';






class App extends Component {  
  // clear current script play info
  componentDidMount() {
    document.title = "Simulife++";
    window.addEventListener('beforeunload', this.handleBeforeUnload);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
  }

  handleBeforeUnload = () => {
    // Remove the sessionStorage variable
    if(sessionStorage.getItem("scriptplay-info")){
        sessionStorage.removeItem('scriptplay-info');
    }
  }




  render() {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage></LoginPage>}></Route>
            <Route path="/welcome" element={<Welcome></Welcome>}></Route>
            <Route path="/" element={ <><Header></Header> <Home></Home></>}></Route>
            <Route path="/story" element={ <><Header></Header> <StoryPage></StoryPage></>}></Route>
            <Route path="/ending" element={ <><Header></Header> <StoryEndingPage></StoryEndingPage> </>}></Route>
            <Route path="/thoughts" element={ <><Header></Header> <ThoughtsPage></ThoughtsPage> </>}></Route>
            <Route path="/history" element={ <><Header></Header> <HistoryPage></HistoryPage> </>}></Route>
            <Route path="/script-description" element={ <><Header></Header> <ScriptDescription></ScriptDescription> </>}></Route>
            <Route path="/sage-selection" element={ <><Header></Header> <WdigetSelectionPage></WdigetSelectionPage> </>}></Route>
          </Routes>
        </BrowserRouter>
      </>
      )
  };
}

export default App;
