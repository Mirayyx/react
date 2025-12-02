// app/layout.jsx
export const metadata = {
  title: "Pesan Saluran Biru Bercahaya",
  description: "Viewer pesan saluran dengan tema biru bercahaya.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
