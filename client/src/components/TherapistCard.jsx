import "../css/TherapistCard.css";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

function TherapistCard({
  therapists,
  onSeeClients,
  onDeleteTherapist,
  onAddTherapist,
}) {
  console.log(therapists);
  return (
    <>
      <div className="section-headers">
        <h1>Therapists</h1>
        <IoMdAdd
          className="section-actions"
          onClick={() => {
            const first_name = window.prompt("Enter therapist's first name:");
            if (!first_name) return;

            const last_name = window.prompt("Enter therapist's last name:");
            if (!last_name) return;

            onAddTherapist({ first_name, last_name });
          }}
        />
      </div>
      <div className="card-container">
        {therapists.map((therapist) => (
          <div key={therapist.id} className="card">
            <span className="therapist-name">
              {therapist.first_name} {therapist.last_name}
            </span>
            <div className="card-actions">
              <button onClick={() => onSeeClients(therapist.id)}>
                See Clients
              </button>
              <MdDeleteOutline
                onClick={() => {
                  if (window.confirm("Delete this therapist?")) {
                    onDeleteTherapist(therapist.id);
                  }
                }}
                className="delete-icon"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default TherapistCard;
