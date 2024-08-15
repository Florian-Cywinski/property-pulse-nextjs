import '@/assets/styles/globals.css';   // To have Tailwind working // @ points to the root directory
import Navbar from '@/components/Navbar';   // To have it on every page
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider'; // AuthProvider is a client component which is used in this server component

export const metadata = {
  title: 'PropertyPulse',   // To add a title (tab)
  description: 'Find The Perfect Rental Property',
  keywords: 'rental, property, real estate',
};

const MainLayout = ({ children }) => {    // children is the prop pasted in (page.jsx (homepage))
  return (
    <AuthProvider>
      <html>
        <body>
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
