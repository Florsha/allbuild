import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import "./style.css";

const Tracking = ({ trackings = [], reference_number = "" }) => {
  const [reference, setReference] = useState(reference_number);

  const submit = (e) => {
    e.preventDefault();

    Inertia.get(
      route("tracking.index"),
      { reference_number: reference },
      {
        preserveState: true,
        replace: true,
      }
    );
  };

  return (
    <div className="tracking-container">
      <h2>Track Your Request</h2>

      <form onSubmit={submit} className="tracking-search">
        <input
          type="text"
          placeholder="Enter Reference Number"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
        />
        <button type="submit">Track</button>
      </form>

      {trackings.length > 0 ? (
        <ul className="tracking-timeline">
          {trackings.map((item, index) => (
            <li key={index} className="tracking-item">
              <div className="status-dot"></div>

              <div className="tracking-content">
                <h4>{item.status}</h4>
                <p>{item.remarks}</p>
                <small>{item.created_at}</small>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        reference && <p className="no-data">No tracking records found.</p>
      )}
    </div>
  );
};

export default Tracking;
