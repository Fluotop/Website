export default function CreatePanel({ items }) {
  return (
    <div className="content-panel">
      {items.filter((p) => p.panel === true).map((panel) => (
        <div key={panel.id} id={panel.id}>
          <panel.Component />
        </div>
      ))}
    </div>
  );
}
