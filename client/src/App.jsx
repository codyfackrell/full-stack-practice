import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [therapists, setTherapists] = useState([{}]);

  useEffect(() => {
    fetch("/therapists")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then((data) => setTherapists(data));
  }, []);
  console.log(therapists);
  return (
    <>
      <div>
        {therapists.map((therapist) => (
          <div key={therapist.id}>
            {therapist.first_name} {therapist.last_name}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
