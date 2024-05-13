import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import NotFoundPage from "./pages/NotFound";
import RootLayout from "./pages/Root";
import ContactDetailPage from "./pages/ContactDetail";
import { ContactNotFoundPage } from "./pages/ContactNotFound";
import ContactsPage from "./pages/Contacts";

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<RootLayout />} errorElement={<NotFoundPage />}>
      <Route
        index={true}
        element={<Navigate to={"contacts"} replace={true} />}
      />

      <Route
        path="contacts"
        element={<ContactsPage />}
      />

      <Route
        path="contacts/:contactId"
        element={<ContactDetailPage />}
        errorElement={<ContactNotFoundPage />}
      />
    </Route>,
  ),
);

export default appRouter;
