 
import "../styles/globals.css";


export const metadata = {
  title: "Password Vault",
  description: "Secure password manager and generator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
