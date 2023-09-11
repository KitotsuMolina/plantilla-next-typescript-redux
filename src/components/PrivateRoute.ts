// components/PrivateRoute.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import {clientSupabase} from "@/supabase/client";

const PrivateRoute = ({ children }:{children:any}) => {
    const router = useRouter();

    useEffect(() => {
        const user = clientSupabase.auth.getUser();

        if (!user) {
            router.push('/login'); // Redirige a la página de inicio de sesión si el usuario no está autenticado.
        }
    }, []);

    return children;
};

export default PrivateRoute;
