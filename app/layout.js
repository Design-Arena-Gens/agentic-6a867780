export const metadata = {
  title: 'Signature Électronique - Ouabas Hakima',
  description: 'Générateur de signature électronique pour Ouabas Hakima',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
