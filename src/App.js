import logo from './logo.svg';
import { Header } from './components/layout/Header';
import './App.css';

export const App = () => (
  <div className="App">
    <Header />
    <img src={logo} className="App-logo" alt="logo" />
    <p>
      UTasks is a simple <a href="https://todoist.com/">Todoist </a> clone
    </p>
  </div >
);
