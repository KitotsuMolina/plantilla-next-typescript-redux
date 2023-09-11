'use client'
import {useRouter} from "next/navigation";
import {clientSupabase} from "@/supabase/client";
import {Button} from "@mui/material";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {removeSession, removeUser} from "@/redux/features/userSlice";
import Cookies from 'js-cookie';
const DashBoard: React.FC<{  }> = props => {
    const router = useRouter();
    const {session,user} = useAppSelector(state => state.userReducer)

    const dispatch = useAppDispatch()
    const handleLogout = async () => {
        try {
            const {error}=await clientSupabase.auth.signOut();
            if(error)throw new Error(error.message)
            dispatch(removeUser)
            dispatch(removeSession)
            Cookies.remove('jwt-token')
            Cookies.remove("refresh-token");
            router.push('/login'); // Redirige al usuario a la página de inicio de sesión después del cierre de sesión.
        } catch (error:any) {
            console.error(error.message);
        }
    };
    const getUserSupabase = async () =>{
        const { data, error } = await clientSupabase.auth.getUser()
        if(error)console.error(error.message);
        console.log(data)
    }
    return (
        <div>
            <h1>Dashboard</h1>
            <Button onClick={()=>handleLogout()} variant="contained" color="primary" className={'m-2'} style={{ background: '#1976D2', color: 'white' }}>Logout</Button>
            <Button onClick={()=>getUserSupabase()} variant="contained" color="primary" className={'m-2'} style={{ background: '#1976D2', color: 'white' }}>get user</Button>
        </div>
    );
};

export default DashBoard