import "./globals.css";

export const metadata = {
  title: "Fake Client Lab",
  description: "AI-powered client brief generator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
