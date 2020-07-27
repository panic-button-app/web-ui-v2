import Head from 'next/head'
import React, { useState, useContext } from 'react'
import { UserContext } from './user-context'

interface Contact {
  id: string;
  name: string;
}

type Contacts = Contact[];

export default function Contacts () {
  const user = useContext(UserContext)

  const [contacts] = useState<Contacts>([])

  if (!user.isAuthenticated) {
    return null
  }

  const addContact = () => {
  }

  return (
    <div>
      <Head>
        <title>Panic Button | Contacts</title>
      </Head>
      {contacts.map((contact) => (
        <div key={contact.id}>
          <h1>{contact.name}</h1>
        </div>
      ))}
      <button onClick={addContact} type="button" className="btn btn-success">Add Contact</button>
    </div>
  )
}
