import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { deleteContactAction, getContactByIdAction, selectOpenedContact } from "../store/contactsSlice";

const ContactDetailPage = () => {
  const params = useParams();
  const { contactId } = params;
  const contact = useAppSelector(selectOpenedContact);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    dispatch(getContactByIdAction(contactId!)).unwrap().catch(err => {
      setError(err);
    });
  }, []);

  if (error) {
    throw error;
  } 

  if (!contact) {
    return null;
  }

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
          <button onClick={async () => {
            const result = confirm('Confirm deletion of this contact.');
            if (!result) {
              return;
            }
            await dispatch(deleteContactAction(contact.login.uuid));
            navigate('/contacts');
          }} className="btn btn-outline btn-error btn-sm">
            delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactDetailPage;
