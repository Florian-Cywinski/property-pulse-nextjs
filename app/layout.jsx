// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
// import AuthProvider from '@/components/AuthProvider';
// import { GlobalProvider } from '@/context/GlobalContext';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import '@/assets/styles/globals.css';   // To have Tailwind working // @ points to the root directory
// import 'photoswipe/dist/photoswipe.css';

// export const metadata = {
//   title: 'PropertyPulse',
//   description: 'Find The Perfect Rental Property',
//   keywords: 'rental, property, real estate',
// };

const MainLayout = ({ children }) => {    // children is the prop pasted in (page.jsx (homepage))
  return (
    <html>
      <body>
        <main>
          {children}
        </main>
      </body>
    </html>
    // <AuthProvider>
    //   <GlobalProvider>
    //     <html lang='en'>
    //       <body>
    //         <Navbar />
    //         <main>{children}</main>
    //         <Footer />
    //         <ToastContainer />
    //       </body>
    //     </html>
    //   </GlobalProvider>
    // </AuthProvider>
  );
};

export default MainLayout;
