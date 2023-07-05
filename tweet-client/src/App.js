import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from 'components/Layout';
import AuthLayout from 'components/Layout/AuthLayout';
import SignUp from 'pages/SignUp';
import LogIn from 'pages/LogIn';
import NotFound from 'pages/NotFound';
import Home from 'pages/Home';
import NewMessage from 'pages/Message/NewMessage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<LogIn />} />
          <Route element={<AuthLayout />}>
            <Route path="new-message" element={<NewMessage />} />
            {/* <Route path=":messageId" element={<MessageDetail />} /> */}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
