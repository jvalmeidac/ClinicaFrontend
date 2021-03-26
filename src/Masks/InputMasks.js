import React from "react";
import InputMask from "react-input-mask";

export const PhoneInput = (props) => (
  <InputMask
    mask="(99) 99999-9999"
    value={props.value}
    onChange={props.onChange}
  >
    {(inputProps) => (
      <input
        {...inputProps}
        autoComplete="off"
        required
        placeholder="Digite seu telefone"
        id="inputPhone"
        type="text"
        className="form-control"
      />
    )}
  </InputMask>
);

export const CpfInput = (props) => (
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

export const CepInput = (props) => (
  <InputMask mask="99999-999" value={props.value} onChange={props.onChange}>
    {(inputProps) => (
      <input
        {...inputProps}
        autoComplete="off"
        required
        placeholder="CEP"
        id="inputCep"
        className="form-control"
      />
    )}
  </InputMask>
);
