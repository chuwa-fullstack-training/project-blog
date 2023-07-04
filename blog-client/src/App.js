import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="about" element={<About />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<LogIn />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function About() {
  return <h1>About</h1>;
}

function NotFound() {
  return <h1>Not Found</h1>;
}

export default App;
