import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import AppRoutes from "../../routes";
import ToastProvider from "../Toast/ToastProvider";
import "./AppShell.css";

const AppShell = () => {
  return (
    <ToastProvider>
      <div className="app-shell">
        <Navbar />
        <main className="app-shell__main">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </ToastProvider>
  );
};

export default AppShell;
