import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface Props {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const { token } = useAuth();
return token ? <>{children}</> : <Navigate to="/login" replace />;

};

export default PrivateRoute;
