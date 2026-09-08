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


const App: FC = () => {

  return (
    <Router basename="/react-ts-d-m">
      <Routes>
        <Route path={AppRoutes.HOMEPAGE} element={<HomePage />} />
        <Route path={AppRoutes.CATALOGPAGE} element={<CatalogPage />} />
        <Route path={AppRoutes.PREOWNEDCARSPAGE} element={<PreOwnedCarsPage />} />
        <Route path={AppRoutes.FINANCEPAGE} element={<FinancePage />} />
        <Route path={AppRoutes.LEASYVSBUYPAGE} element={<LeaseVsBuyPage />} />
        <Route path={AppRoutes.CONTACTSPAGE} element={<ContactsPage />} />
        <Route path={AppRoutes.NOT_FOUNDPAGE} element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App
