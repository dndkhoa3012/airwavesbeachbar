import localFont from "next/font/local";
import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';

const baskervville = localFont({
  src: './fonts/Baskervville-VariableFont_wght.ttf',
  variable: '--font-baskervville',
  display: 'swap',
});


export const metadata = {
  title: "Airwaves Beach Club",
  description: "Phú Quốc Luxury Beach Bar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className={`${baskervville.variable}`} suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased bg-white text-slate-900 font-display">
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#4ade80',
                borderRadius: 8,
              },
            }}
          >
            {children}
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
