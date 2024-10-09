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

        {/* Clarity Analytics */}
        <Script id="clarity-init" type="text/javascript">
            {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "oc8aqlz9f7");`}
        </Script>

        {/* Meta Pixel */}
        <Script id="meta-pixel-init" type="text/javascript">
            {`!function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '8261155657315177');
            fbq('track', 'PageView');`}
        </Script>
        <noscript>
            <img height="1" width="1" className="hidden" src="https://www.facebook.com/tr?id=8261155657315177&ev=PageView&noscript=1"
        /></noscript>

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
