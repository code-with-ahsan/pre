import { Params, useLoaderData } from "react-router-dom";
import { getContactById } from "../api/contactsApi";

type LoaderArgs = {
  params: Params<string>;
};

export const contactDetailsLoader = async ({ params }: LoaderArgs) => {
  const { contactId } = params;
  if (!contactId) {
    throw new Error("ContactId not provided");
  }
  const contact = await getContactById(contactId);
  if (!contact) {
    throw new Error("Contact not found");
  }
  return {
    contact,
  };
};

const ContactDetailPage = () => {
  const { contact } = useLoaderData() as Awaited<
    ReturnType<typeof contactDetailsLoader>
  >;
  return (
    <div className="card card-compact w-96 mx-auto bg-base-100 shadow-xl">
      <div className="card-body items-center text-center">
        <div className={`avatar ${contact.picture ? "" : "placeholder"}`}>
          {contact.picture ? (
            <div className="mask mask-squircle w-12 h-12">
              <img
                src={contact.picture.thumbnail}
                alt="Avatar Tailwind CSS Component"
              />
            </div>
          ) : (
            <div className="bg-neutral text-neutral-content rounded-full w-12">
              <span className="uppercase">
                {contact.name.first[0]}
                {contact.name.last[0]}
              </span>
            </div>
          )}
        </div>
        <h2 className="card-title">
          {contact.name.first} {contact.name.last}
        </h2>
        <p>{contact.email}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-sm btn-outline btn-error">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ContactDetailPage;
