import React from "react";

export function Error(props) {
  return (
    <>
      <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <strong class="me-auto">{props.header}</strong>
          <small>{props.minutes}</small>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div class="toast-body">{props.body}</div>
      </div>
    </>
  );
}
