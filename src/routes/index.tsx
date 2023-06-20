import { useContext } from 'react';
import { Context } from '../context';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

export default function Routes() {
    const context = useContext(Context);

    return context.user ? <AppRoutes /> : <AuthRoutes />;
}
