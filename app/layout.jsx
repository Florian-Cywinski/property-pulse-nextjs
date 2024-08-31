import '@/assets/styles/globals.css';   // To have Tailwind working // @ points to the root directory
import Navbar from '@/components/Navbar';   // To have it on every page
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider'; // AuthProvider is a client component which is used in this server component
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalProvider } from '@/context/GlobalContext'; // That all components have access to the message count state - Global Context For Message Count

export const metadata = {
  title: 'PropertyPulse',   // To add a title (tab)
  description: 'Find The Perfect Rental Property',
  keywords: 'rental, property, real estate',
};

const MainLayout = ({ children }) => {    // children is the prop pasted in (page.jsx (homepage))
  return (
    <AuthProvider>
      <GlobalProvider>
        <html>
          <body>
            <Navbar />
            <main>
              {children}
            </main>
            <Footer />
            <ToastContainer />   {/* It doesn't matter where it is placed, as it is positioned absolute */}
          </body>
        </html>
      </GlobalProvider>
    </AuthProvider>
  );
};

export default MainLayout;
