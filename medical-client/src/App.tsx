import { Route, Routes } from 'react-router-dom';
import './App.css';
import Signup from './components/organisms/Signup';
import Login from './components/organisms/Login';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import Home from './components/organisms/Home';


function App() {
  const initialOptions = {
    clientId: "AeKFK5uK_LZxOIdtpKzxDZtOZGGUHP867wfC3P8GDiKtghQhhJc4bNMhiQRtGeC-tHd1iriQGsRhnpV0",
    currency: "USD",
    intent: "capture",
  };
  return (
    <PayPalScriptProvider options={initialOptions}>
    <div className="App">
      <Routes>
          <Route path="/signup" element={ <Signup/>} /> 
          <Route path="/login" element={ <Login/>} /> 
          <Route path="/*" element={<Home/>} />
      </Routes>
    </div>
    </PayPalScriptProvider>
  );
}

export default App;
