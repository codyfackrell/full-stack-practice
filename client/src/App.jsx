import { useState, useEffect } from "react";
import TherapistCard from "./components/TherapistCard.jsx";
import { IoClose, IoAdd } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";

import "./App.css";

function App() {
  const [therapists, setTherapists] = useState([]);
  const [clients, setClients] = useState([]);
  const [showClients, setShowClients] = useState(false);
  const [selectedTherapistId, setSelectedTherapistId] = useState(null);

  useEffect(() => {
    fetch("/therapists")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then((data) => setTherapists(data));
  }, []);

  const handleSeeClients = (therapistId) => {
    setShowClients(true);
    setSelectedTherapistId(therapistId);

    fetch(`/clients/${therapistId}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then((data) => setClients(data));
  };

  const handleAddClient = async (clientDetails) => {
    const res = await fetch(`/clients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clientDetails),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);

    const newClient = await res.json();
    setClients((prev) => [...prev, newClient]);
  };

  const handleDeleteTherapist = (therapistId) => {
    fetch(`/therapists/${therapistId}`, {
      method: "DELETE",
    }).then((res) => {
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return res.json();
    });

    setTherapists((prev) =>
      prev.filter((therapist) => therapist.id !== therapistId)
    );
  };

  const handleAddTherapist = async (therapistDetails) => {
    const res = await fetch(`/therapists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(therapistDetails),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);

    const newTherapist = await res.json();
    setTherapists((prev) => [...prev, newTherapist]);
  };

  return (
    <>
      <TherapistCard
        therapists={therapists}
        onSeeClients={handleSeeClients}
        onDeleteTherapist={handleDeleteTherapist}
        onAddTherapist={handleAddTherapist}
      />
      {showClients && (
        <div className="client-list">
          <span className="client-headers">
            <h2>Clients</h2>
            <IoMdAdd
              onClick={() => {
                const first_name = window.prompt("Enter Client First Name");
                const last_name = window.prompt("Enter Client Last Name");

                handleAddClient({
                  first_name,
                  last_name,
                  therapist_id: selectedTherapistId,
                });
              }}
              className="client-actions"
            />
            <IoClose
              onClick={() => {
                setClients([]),
                  setShowClients(false),
                  setSelectedTherapistId(null);
              }}
              className="client-actions"
            />
          </span>
          {clients.length > 0 ? (
            <ul>
              {clients.map((client) => (
                <li key={client.id}>
                  {client.first_name} {client.last_name}
                </li>
              ))}
            </ul>
          ) : (
            <p>Therapist has no clients.</p>
          )}
        </div>
      )}
    </>
  );
}

export default App;
