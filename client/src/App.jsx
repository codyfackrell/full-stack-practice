import { useState, useEffect } from "react";
import TherapistCard from "./components/TherapistCard.jsx";
import { IoClose, IoAdd } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";

import "./App.css";

function App() {
  const [therapists, setTherapists] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch("/therapists")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then((data) => setTherapists(data));
  }, []);

  const handleSeeClients = (therapistId) => {
    fetch(`/clients/${therapistId}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then((data) => setClients(data));
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
    console.log(res);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);

    // const newTherapist = res.json();
    // setTherapists((prev) => [...prev, newTherapist]);
    const result = await res.json();
    console.log("Success:", result);
  };

  return (
    <>
      <TherapistCard
        therapists={therapists}
        onSeeClients={handleSeeClients}
        onDeleteTherapist={handleDeleteTherapist}
        onAddTherapist={handleAddTherapist}
      />
      {clients.length > 0 && (
        <div className="client-list">
          <span className="client-headers">
            <h2>Clients</h2>
            <IoMdAdd className="client-actions" />
            <IoClose
              onClick={() => setClients([])}
              className="client-actions"
            />
          </span>
          <ul>
            {clients.map((client) => (
              <li key={client.id}>
                {client.first_name} {client.last_name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default App;
