import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import HomePage from './page/HomePage';
import TimerPage from './page/TimerPage';
import AddLight from './page/AddLightPage';
import Test from './page/test';
import SignUp from './page/SignUpPage';
import { AuthProvider } from './contexts/AuthContext';

import Imitate from './page/Imitate';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Test />} />
          <Route path='/SignUp' element={<SignUp />} />

          <Route path='/Imitate' element={<Imitate />} />

          <Route path='/Test' element={<Test />} />

          <Route path='/TimerPage' element={<TimerPage />} />
          <Route path='/AddLight' element={<AddLight />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
