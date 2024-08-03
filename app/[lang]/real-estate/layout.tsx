import type {Metadata} from "next";
import "../../globals.css";
import Navbar from "@/components/Navbar";
import {LanguageType} from "@/types";

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
        <Navbar lang={lang}/>
        {children}
        </body>
        </html>
    );
}
