import "./TwoColumns.css";

export default function TwoColumns({ left, right }) {
  return (
    <div className="container">
      <div className="column">{left}</div>
      <div className="column">{right}</div>
    </div>
  );
}
