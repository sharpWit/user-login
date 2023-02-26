// import './App.css';
import { useAuthState } from "./context/auth-context";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  const { token } = useAuthState();
  return <>{token ? <Dashboard /> : <Login />}</>;
}

export default App;
