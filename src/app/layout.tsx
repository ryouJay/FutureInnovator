import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import {GlobalStateProvider} from "./context/GlobalStateContext";

const nextFont = Noto_Sans_KR({ subsets: ["latin"], weight:"400" });
const bodyClass = "bg-basic bg-opacity-90"

export const metadata: Metadata = {
    title: "future-innovator",
    description: "portfolio for RyuJay",
};

const RootLayout = ({children}:any) => {
    return (
        <html lang="en">
        <GlobalStateProvider>
            <body className={`${nextFont.className} ${bodyClass}`}>{children}</body>
        </GlobalStateProvider>
        </html>
    );
}

export default RootLayout