import { useState, useEffect } from "react";
import TherapistCard from "./components/TherapistCard.jsx";
import ClientList from "./components/ClientList.jsx";

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

  const onCloseClients = () => {
    setClients([]), setShowClients(false), setSelectedTherapistId(null);
  };

  return (
    <>
      <TherapistCard
        therapists={therapists}
        onSeeClients={handleSeeClients}
        onDeleteTherapist={handleDeleteTherapist}
        onAddTherapist={handleAddTherapist}
      />
      <ClientList
        onAddClient={handleAddClient}
        clients={clients}
        showClients={showClients}
        selectedTherapistId={selectedTherapistId}
        closeClients={onCloseClients}
      />
    </>
  );
}

export default App;
