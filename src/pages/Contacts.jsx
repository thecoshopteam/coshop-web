import { useState } from "react";

const ContactsPage = () => {
  // Dummy data for contacts
  const contacts = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Bobby Johnson", email: "bob@example.com" },
  ];

  return (
    <div className="p-5 lg:p-10">
      <h1 className="text-3xl font-semibold">Contacts</h1>
      <div className="mt-10 space-y-4">
        {contacts.map(contact => (
          <div
            key={contact.id}
            className="rounded-lg border border-gray-200 p-4"
          >
            <h2 className="text-xl font-medium">Name: {contact.name}</h2>
            <p className="text-lg">Email: {contact.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactsPage;
