'use client'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {Providers} from "@/redux/providers";
import Script from 'next/script'

import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';



import "primereact/resources/themes/lara-dark-indigo/theme.css";
import "primereact/resources/primereact.min.css";

const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <head>
    </head>
      <body className={inter.className}>
      <PrimeReactProvider>
          <Providers>
            {children}
          </Providers>
      </PrimeReactProvider>
      </body>
    </html>
  )
}
