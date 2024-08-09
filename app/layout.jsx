import '@/assets/styles/globals.css';   // To have Tailwind working // @ points to the root directory

export const metadata = {
  title: 'PropertyPulse',   // To add a title (tab)
  description: 'Find The Perfect Rental Property',
  keywords: 'rental, property, real estate',
};

const MainLayout = ({ children }) => {    // children is the prop pasted in (page.jsx (homepage))
  return (
    <html>
      <body>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
};

export default MainLayout;
