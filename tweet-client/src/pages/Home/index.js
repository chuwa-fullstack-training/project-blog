import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import MessageTimeline from 'pages/Message';

export default function Home() {
  const { isAuthenticated } = useSelector(state => state.user);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: '/' }} />;
  }

  return (
    <div>
      <h1>Home</h1>
      <MessageTimeline />
    </div>
  );
}
