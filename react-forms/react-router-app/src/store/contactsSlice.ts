import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Contact } from "../types";
import { createContact, deleteContact, getContactById, getContacts } from "../api/contactsApi";
import { RootState } from "./store";

interface ContactsState {
  items: Contact[],
  openedContact: Contact | null,
  loading: 'pending' | 'idle'
}

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;
type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;

export const getContactsAction = createAsyncThunk('contacts/getContacts', async () => {
  const contacts = await getContacts();
  return contacts;
});

export const createContactAction = createAsyncThunk<Contact, Partial<Contact>>('contacts/createContact', async (contact) => {
  const newContact = await createContact(contact);
  return newContact;
});

export const getContactByIdAction = createAsyncThunk<Contact, string>('contacts/getContactById', async (contactId) => {
  const contact = await getContactById(contactId);
  return contact;
});

export const deleteContactAction = createAsyncThunk<Contact, string>('contacts/deleteContact', async (contactId) => {
  const deletedContact = await deleteContact(contactId);
  return deletedContact;
});

const initialState: ContactsState = {
  items: [],
  openedContact: null,
  loading: 'idle'
}

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getContactsAction.fulfilled, (state, action) => {
      state.items = action.payload;
    }).addCase(createContactAction.fulfilled, (state, action) => {
      state.items.unshift(action.payload);
    }).addCase(getContactByIdAction.fulfilled, (state, action) => {
      state.openedContact = action.payload;
    }).addCase(deleteContactAction.fulfilled, (state, action) => {
      state.items = state.items.filter(item => {
        return item.login.uuid !== action.payload.login.uuid;
      })
    }).addMatcher((action): action is PendingAction => action.type.endsWith('/pending'), (state) => {
      state.loading = 'pending';
    }).addMatcher((action): action is RejectedAction => action.type.endsWith('/rejected'), (state) => {
      state.loading = 'idle';
    }).addMatcher((action): action is FulfilledAction => action.type.endsWith('/fulfilled'), (state) => {
      state.loading = 'idle';
    })
  }
});

const contactsReducer = contactsSlice.reducer;

export const selectIsLoading = (state: RootState) => {
  return state.contacts.loading === 'pending';
}

export const selectContacts = (state: RootState) => {
  return state.contacts.items;
}

export const selectOpenedContact = (state: RootState) => {
  return state.contacts.openedContact;
}

export default contactsReducer;