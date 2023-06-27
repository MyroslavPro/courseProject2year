import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./containers/Header/Header";
import Footer from "./containers/Footer/Footer";
// import { ItemsContext, items } from "./containers/ItemsContext/ItemContext";

function App() {
  return (
      <Router>
          <div className="App">
            <Header/>
            <Footer/>
          </div>
        </Router>
  );
}

export default App;
