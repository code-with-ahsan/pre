import { ActionFunctionArgs, redirect } from "react-router-dom";
import { deleteContact } from "../api/contactsApi";

export async function destroyContactAction({ params }: ActionFunctionArgs) {
  if (!params.contactId) {
    return redirect('/404');
  }
  await deleteContact(params.contactId);
  return redirect("/contacts");
}