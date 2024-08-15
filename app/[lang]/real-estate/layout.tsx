import type {Metadata} from "next";
import "../../globals.css";
import Navbar from "@/components/Navbar";
import {LanguageType} from "@/types";
import Head from "next/head";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Real Estate - AREA",
    description: "Find your dream home with AREA"
};

export default function RootLayout({
                                       children,
                                       params
                                   }: Readonly<{
    children: React.ReactNode;
    params: { lang: LanguageType }
}>) {
    const {lang} = params;

    return (
        <html lang="en">
        <body>
        {/*Google Analytics*/}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-V5LD105MY7"></Script>
        <Script id='ga-init'>
            {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-V5LD105MY7');
              `}
        </Script>
        {/*Google Tag Manager*/}
        <Script id="gtm-init">
            {`
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-PDF59VZK');
            `}
        </Script>

        {/* Google Tag Manager (noscript) */}
        <noscript>
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PDF59VZK" height="0" width="0"
                    style={{display: "none", visibility: "hidden"}}></iframe>
        </noscript>

        <Navbar lang={lang}/>
        {children}
        </body>
        </html>
    );
}
