import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Contact } from "../types";
import { createContact, deleteContact, getContactById, getContacts } from "../api/contactsApi";

interface ContactsState {
  items: Contact[],
  openedContact: Contact | null,
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState: ContactsState = {
  items: [],
  openedContact: null,
  loading: 'idle'
}

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;
type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;

export const getContactsAction = createAsyncThunk('contacts/getContacts', async () => {
  const contacts = await getContacts();
  return contacts;
})

export const getContactByIdAction = createAsyncThunk<Contact | undefined, string>('contacts/getContactById', async (contactId) => {
  const contact = await getContactById(contactId);
  return contact;
})

export const createContactAction = createAsyncThunk<Contact, Partial<Contact>>('contacts/addContact', async (contact) => {
  const newContact = await createContact(contact);
  return newContact;
})

export const deleteContactAction = createAsyncThunk<Contact, string>('contacts/deleteContact', async (contactId) => {
  const resp = await deleteContact(contactId);
  return resp;
})

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getContactsAction.fulfilled, (state, action) => {
      state.items = action.payload;
    }).addCase(getContactByIdAction.fulfilled, (state, action) => {
      state.openedContact = action.payload || null;
    }).addCase(createContactAction.fulfilled, (state, action) => {
      state.items.unshift(action.payload);
    }).addCase(deleteContactAction.fulfilled, (state, action) => {
      state.items = state.items.filter(item => item.login.uuid !== action.payload.login.uuid)
    }).addMatcher((action): action is RejectedAction => action.type.endsWith("/rejected"), (state, action) => {
      state.loading = "idle";
    }).addMatcher((action): action is PendingAction => action.type.endsWith("/pending"), (state) => {
      state.loading = "pending";
    }).addMatcher((action): action is FulfilledAction => action.type.endsWith("/fulfilled"), (state) => {
      state.loading = 'idle'
    })
  }
});

const contactsReducer = contactsSlice.reducer;

export const selectContacts = (state: RootState) => {
  return state.contacts.items;
}

export const selectOpenedContact = (state: RootState) => {
  return state.contacts.openedContact;
}

export const selectIsPending = (state: RootState) => {
  return state.contacts.loading === 'pending';
}

export default contactsReducer