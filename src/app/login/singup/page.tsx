'use client'
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Toast } from 'primereact/toast';
import { Button, TextField } from '@mui/material';
import { Email, Lock } from '@mui/icons-material';
import {useRef} from "react";
import {clientSupabase} from "@/supabase/client";
import {useRouter} from "next/router";
import Link from "next/link";

const schema = yup.object().shape({
    email: yup.string().required('El correo electrónico es obligatorio').email('Correo electrónico no válido'),
    password: yup.string().min(6,"Minimo 6 caractres para el password").required('La contraseña es obligatoria')
});

type FormData = {
    email: string,
    password: string
};

const SingUpPage: React.FC = () => {

    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const toast = useRef<Toast>(null);

    const onSubmit: SubmitHandler<FormData> = async (dataForm) => {
        // Aquí puedes realizar la lógica de inicio de sesión con los datos de formulario.
        // Por ejemplo, enviar una solicitud de inicio de sesión al servidor.
        try{
            const { data, error } = await clientSupabase.auth.signUp({
                email: dataForm.email,
                password: dataForm.password
            })
            if(error){
                throw new Error(error.message)
            }
            console.log(data);

            toast.current?.show({ severity: 'success', summary: 'Se creo usuario Exitosamente', detail: 'Valida tu Email' });
        }catch (e: Error | any) {
            console.log(e.message);
            toast.current?.show({ severity: 'error', summary: 'Error al crear usuario', detail: 'Contacta con soporte' });
        }

        // Muestra un mensaje de éxito si el inicio de sesión es exitoso.

    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'rgba(0, 0, 255, 0.1)' }}>
            <div style={{ width: '400px', background: 'white', boxShadow: '0px 0px 10px rgba(0, 0, 255, 0.5)', padding: '20px' }}>
                <h1 style={{color: 'black'}} className={'font-bold'}>Crear Usuario</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="p-field">
                        <label htmlFor="email" style={{color: 'black'}}>Correo Electrónico</label>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    id="email"
                                    {...field}
                                    type="text"
                                    fullWidth
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    InputProps={{
                                        startAdornment: (
                                            <Email fontSize="small" color="action" />
                                        ),
                                    }}
                                />
                            )}
                        />
                    </div>
                    <div className="p-field">
                        <label style={{color: 'black'}} htmlFor="password">Contraseña</label>
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    id="password"
                                    {...field}
                                    type="password"
                                    fullWidth
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                    InputProps={{
                                        startAdornment: (
                                            <Lock fontSize="small" color="action" />
                                        ),
                                    }}
                                />
                            )}
                        />
                    </div>
                    <div className="p-field">
                        <Button type="submit" variant="contained" color="primary" className={'m-2'} style={{ background: '#1976D2', color: 'white' }}>
                            Enviar
                        </Button>
                        <Link legacyBehavior href="/login">
                            <a className={'text-black hover:text-blue'}>Sing In</a>
                        </Link>
                    </div>

                </form>
            </div>
            <Toast ref={toast} />
        </div>
    );
};

export default SingUpPage;
