import "./App.scss";
import Books from "./Components/Books";
import Header from "./Components/Header";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="container">
        <Books />
      </div>
    </div>
  );
}

export default App;
