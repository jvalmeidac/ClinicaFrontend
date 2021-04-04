import React from "react";

function ScheduledBadge() {
  return (
    <span className="badge rounded-pill bg-info text-dark">
      <i class="bi bi-clock"></i> Agendada
    </span>
  );
}

function FullfilledBadge() {
  return (
    <span className="badge rounded-pill bg-success">
      <i class="bi bi-check-circle"></i> Realizada
    </span>
  );
}

function MissedBadge() {
  return (
    <span className="badge rounded-pill bg-danger">
      <i class="bi bi-x-circle"></i> Não compareceu
    </span>
  );
}

function StatusBadge(props) {
  const status = props.status;
  if (status === 1) {
    return <MissedBadge />;
  } else if (status === 2) {
    return <FullfilledBadge />;
  } else {
    return <ScheduledBadge />;
  }
}

export default StatusBadge;
