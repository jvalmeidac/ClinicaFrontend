import React from "react";
import InputMask from "react-input-mask";

export function CpfMask(props) {
  return (
    <InputMask
      mask="999.999.999-99"
      value={props.value}
      onChange={props.onChange}
    >
      {(inputProps) => (
        <input
          {...inputProps}
          autoComplete="off"
          required
          placeholder="Digite seu CPF"
          id="inputCpf"
          type="text"
          className="form-control"
        />
      )}
    </InputMask>
  );
}
