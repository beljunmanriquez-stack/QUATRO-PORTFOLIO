import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Team Portfolio",
  description: "Creative Team Portfolio & Education Showcase",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${montserrat.className} antialiased bg-[#040d26] text-white`}
      >
        {children}
      </body>
    </html>
  );
}