import type { FC } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import ContactsPage from "./pages/ContactsPage";
import NotFoundPage from "./pages/NotFoundPage";
import PreOwnedCarsPage from "./pages/PreOwnedCarsPage";
import FinancePage from "./pages/FinancePage";
import LeaseVsBuyPage from "./pages/LeaseVsBuyPage";
import { AppRoutes } from "./constants/global.constants";
import './App.css'


const App: FC = () => {

  return (
    <Router basename="/react-d-m">
      <Routes>
        <Route path={AppRoutes.HOMEPAGE} element={<HomePage />} />
        <Route path={AppRoutes.CATALOGPAGE} element={<CatalogPage />} />
        <Route path="/preownedcars" element={<PreOwnedCarsPage />} />
        <Route path="/finance" element={<FinancePage />} />
        <Route path="/leasevsbuy" element={<LeaseVsBuyPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App
