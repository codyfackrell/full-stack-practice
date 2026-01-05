import { IoClose, IoAdd } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import "../css/ClientList.css";

function ClientList({
  onAddClient,
  clients,
  showClients,
  selectedTherapistId,
  closeClients,
}) {
  return (
    showClients && (
      <div className="client-list">
        <span className="client-headers">
          <h2>Clients</h2>
          <IoMdAdd
            onClick={() => {
              const first_name = window.prompt("Enter Client First Name");
              const last_name = window.prompt("Enter Client Last Name");

              onAddClient({
                first_name,
                last_name,
                // therapist_id: selectedTherapistId,
              });
            }}
            className="client-actions"
          />
          <IoClose onClick={closeClients} className="client-actions" />
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
    )
  );
}

export default ClientList;
