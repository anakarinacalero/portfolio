// StackList.jsx — tech stack chip list.

const GROUPS = [
  { name: "Backend", items: [".NET 9", "C#", "REST API", "JWT", "Dapper", "EF Core"] },
  { name: "Frontend", items: ["Blazor", "HTML", "CSS", "DevExpress", "MudBlazor"] },
  { name: "Data", items: ["SQL Server", "MySQL"] },
  { name: "AI", items: ["Claude Code", "Codex"] },
];

function StackList() {
  return (
    <section className="stack-section">
      <div className="section-head">
        <span className="eyebrow">Toolbox</span>
        <h2>Things I reach for.</h2>
      </div>
      <div className="stack-groups">
        {GROUPS.map(g => (
          <div key={g.name} className="stack-group">
            <div className="stack-group-name">{g.name}</div>
            <div className="stack-chips">
              {g.items.map(i => <span key={i} className="chip">{i}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

window.StackList = StackList;
