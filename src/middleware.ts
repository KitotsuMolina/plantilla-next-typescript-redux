
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {jwtVerify, JWTPayload, JWTVerifyGetKey, KeyLike} from 'jose'
import Cookies from 'js-cookie';
// This function can be marked `async` if using `await` inside


export const middleware = async (request: NextRequest) => {
    // Obtiene el valor de la cookie que contiene el timestamp almacenado

    const jwt = request.cookies.get('jwt-token')
    if(jwt === undefined){
        if(request.nextUrl.pathname.includes('/dashboard')){
            const redirectTo = '/login'
            const queryParams = new URLSearchParams();
            queryParams.append('error', '701');
            const redirectURL = new URL(redirectTo, request.url);
            redirectURL.search = queryParams.toString();
            return NextResponse.redirect(redirectURL.toString())
        }else{
            return NextResponse.next()
        }
    }

    try {
        const {payload} = await jwtVerify(jwt.value, new TextEncoder().encode(
            process.env.NEXT_PUBLIC_SUPABASE_JWT_SECRET
        ))
        const timestampCookie = payload.exp
        if (timestampCookie) {
            // Convierte el valor de la cookie en un objeto Date o timestamp en milisegundos
            const timestampStored = timestampCookie // Asumiendo que el valor es un número

            // Obtiene el timestamp actual
            const timestampNow = Date.now(); // En milisegundos

            if (timestampStored > timestampNow) {
                Cookies.remove('jwt-token')
                Cookies.remove("refresh-token");
                const redirectTo = '/login'
                const queryParams = new URLSearchParams();
                queryParams.append('error', '700');
                const redirectURL = new URL(redirectTo, request.url);
                redirectURL.search = queryParams.toString();
                return NextResponse.redirect(redirectURL.toString())
            }else{
                if(request.nextUrl.pathname.includes('/login')){
                    return NextResponse.redirect(new URL('/pages/dashboard', request.url))
                }
            }
        } else {
            const redirectTo = '/login'
            const queryParams = new URLSearchParams();
            queryParams.append('error', '700');
            const redirectURL = new URL(redirectTo, request.url);
            redirectURL.search = queryParams.toString();
            return NextResponse.redirect(redirectURL.toString())
        }
    }catch (e:any){
        const redirectTo = '/login'
        const queryParams = new URLSearchParams();
        queryParams.append('error', '700');
        const redirectURL = new URL(redirectTo, request.url);
        redirectURL.search = queryParams.toString();
        return NextResponse.redirect(redirectURL.toString())
    }

    // Puedes acceder a la información del usuario aquí

    return NextResponse.next()
}
export const config = {
    matcher: ['/pages/dashboard/:path*','/login/:path*'],
}