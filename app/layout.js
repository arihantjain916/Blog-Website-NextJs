import "./globals.css";

export const metadata = {
  title: "Blog Website",
  description:
    "A website where user can read the blogs according to there preference and can sort the category of the blogs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative">{children}</body>
    </html>
  );
}

// export default dynamic(() => RootLayout, { ssr: false })
