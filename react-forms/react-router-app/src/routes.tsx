import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import NotFoundPage from "./pages/NotFound";
import RootLayout from "./pages/Root";
import ContactDetailPage, { contactByIdLoader } from "./pages/ContactDetail";
import { ContactNotFoundPage } from "./pages/ContactNotFound";
import ContactsPage, { contactsLoader, createContactAction } from "./pages/Contacts";
import { destroyContactAction } from "./pages/ContactDestroy";
import About from "./pages/About/About";

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<RootLayout />} errorElement={<NotFoundPage />}>
      <Route
        index={true}
        element={<Navigate to={"contacts"} replace={true} />}
      />


      <Route path="about" element={<About />} />

      <Route
        path="contacts"
        action={createContactAction}
        loader={contactsLoader}
        element={<ContactsPage />}
      />

      <Route
        path="contacts/:contactId"
        loader={contactByIdLoader}
        element={<ContactDetailPage />}
        errorElement={<ContactNotFoundPage />}
      />

      <Route action={destroyContactAction} path="contacts/:contactId/destroy" />

    </Route>,
  ),
);

export default appRouter;
