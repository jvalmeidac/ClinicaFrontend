import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { CepInput, CpfInput, PhoneInput } from "../../masks/InputMasks";
import api from "../../services/api";
import cepApi from "../../services/cepApi";

import "./styles.css";
export default function Register() {
  //Personal Data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");

  //Address Data
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [complement, setComplement] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("api/patient/", {
        firstName,
        lastName,
        email,
        password,
        phone,
        birthDate,
        cpf,
        rg,
      });
      setLoading(false);
      if (!data.result.success) {
        toast.error(data.result.notifications[0].message);
        return;
      }
      <Redirect to="/app" />;
    } catch (e) {
      alert(e);
    }
  }

  useEffect(() => {
    async function Get() {
      try {
        const { data } = await cepApi.get(`${cep}.json`);
        setAddress(data.address);
        setCity(data.city);
        setDistrict(data.district);
      } catch (e) {
        console.log(e);
      }
    }
    if (cep.length === 9) Get();
  }, [cep]);

  return (
    <>
      <div className="registerMain">
        <form
          onSubmit={handleRegister}
          style={{
            margin: "30px 0 30px",
            backgroundColor: "white",
            backgroundSize: "cover",
            padding: "30px",
            borderRadius: "8px",
            boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
          }}
          className="col-lg-8"
        >
          <fieldset className="container" id="accountDetails">
            <legend>Detalhes da conta</legend>
            <div className="row mb-lg-1 mb-sm-3">
              <div className="col-lg-6 form-floating mb-sm-3">
                <input
                  autoComplete="off"
                  required
                  placeholder="Email"
                  id="intputEmail"
                  type="email"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label style={{ padding: "1rem 1.5rem" }} htmlFor="intputEmail">
                  Email
                </label>
              </div>
              <div className="col-lg-6 form-floating">
                <input
                  autoComplete="off"
                  required
                  placeholder="Senha"
                  id="inputPassword"
                  type="password"
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label
                  style={{ padding: "1rem 1.5rem" }}
                  htmlFor="inputPassword"
                >
                  Senha
                </label>
              </div>
            </div>
          </fieldset>
          <fieldset className="container" id="personalData">
            <legend>Dados Pessoais</legend>
            <div className="row mb-lg-1 mb-sm-3">
              <div className="col-lg-6 form-floating mb-sm-3">
                <input
                  autoComplete="off"
                  required
                  placeholder="Digite seu nome"
                  id="inputFirstName"
                  type="text"
                  className="form-control"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <label
                  style={{ padding: "1rem 1.5rem" }}
                  htmlFor="inputFirstName"
                >
                  Nome
                </label>
              </div>
              <div className="col-lg-6 form-floating">
                <input
                  autoComplete="off"
                  required
                  placeholder="Digite seu nome"
                  id="inputLastName"
                  type="text"
                  className="form-control"
                  onChange={(e) => setLastName(e.target.value)}
                />
                <label
                  style={{ padding: "1rem 1.5rem" }}
                  htmlFor="inputLastName"
                >
                  Sobrenome
                </label>
              </div>
            </div>
            <div className="row mb-lg-1 mb-sm-3">
              <div className="col-lg-6 form-floating mb-sm-3">
                <CpfInput onChange={(e) => setCpf(e.target.value)} />
                <label style={{ padding: "1rem 1.5rem" }} htmlFor="inputCpf">
                  CPF
                </label>
              </div>
              <div className="col-lg-6 form-floating">
                <input
                  autoComplete="off"
                  required
                  placeholder="Registro Geral"
                  id="inputRg"
                  type="text"
                  className="form-control"
                  onChange={(e) => setRg(e.target.value)}
                />
                <label style={{ padding: "1rem 1.5rem" }} htmlFor="inputRg">
                  RG
                </label>
              </div>
            </div>
            <div className="row mb-lg-1 mb-sm-3">
              <div className="col-lg-6 form-floating mb-sm-3">
                <PhoneInput onChange={(e) => setPhone(e.target.value)} />
                <label style={{ padding: "1rem 1.5rem" }} htmlFor="inputPhone">
                  Telefone
                </label>
              </div>
              <div className="col-lg-6 form-floating">
                <input
                  required
                  type="date"
                  id="inputBirthDate"
                  className="form-control"
                  onChange={(e) => setBirthDate(e.target.value)}
                />
                <label
                  style={{ padding: "1rem 1.5rem" }}
                  htmlFor="inputBirthDate"
                >
                  Data de Nascimento
                </label>
              </div>
            </div>
          </fieldset>
          <fieldset className="container" id="addressData">
            <legend>Endereço</legend>
            <div className="row mb-lg-1 mb-sm-3">
              <div className="col-lg-6 form-floating mb-sm-3">
                <CepInput onChange={(e) => setCep(e.target.value)} />
                <label style={{ padding: "1rem 1.5rem" }} htmlFor="inputCep">
                  CEP
                </label>
              </div>
              <div className="col-lg-6 form-floating">
                <input
                  autoComplete="off"
                  required
                  placeholder="Endereço"
                  id="inputAddress"
                  type="text"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                  className="form-control"
                />
                <label
                  style={{ padding: "1rem 1.5rem" }}
                  htmlFor="inputAddress"
                >
                  Endereço
                </label>
              </div>
            </div>
            <div className="row mb-lg-1 mb-sm-3">
              <div className="col-lg-6 form-floating mb-sm-3">
                <input
                  autoComplete="off"
                  required
                  placeholder="Bairro"
                  id="inputDisctrict"
                  type="text"
                  onChange={(e) => setDistrict(e.target.value)}
                  value={district}
                  className="form-control"
                />
                <label
                  style={{ padding: "1rem 1.5rem" }}
                  htmlFor="inputDistrict"
                >
                  Bairro
                </label>
              </div>
              <div className="col-lg-6 form-floating">
                <input
                  autoComplete="off"
                  required
                  placeholder="Cidade"
                  id="inputCity"
                  type="text"
                  value={city}
                  readOnly
                  className="form-control"
                />
                <label style={{ padding: "1rem 1.5rem" }} htmlFor="inputCity">
                  Cidade
                </label>
              </div>
            </div>
            <div className="row mb-lg-1 mb-sm-3">
              <div className="col-lg-6 form-floating mb-sm-3">
                <input
                  autoComplete="off"
                  placeholder="Complemento"
                  id="inputComplement"
                  type="text"
                  className="form-control"
                  onChange={(e) => setComplement(e.target.value)}
                />
                <label
                  style={{ padding: "1rem 1.5rem" }}
                  htmlFor="inputComplement"
                >
                  Complemento
                </label>
              </div>
            </div>
          </fieldset>
          <div className="mt-3 text-center">
            <p>
              Já possui uma conta? <Link to="/">Fazer login</Link>
            </p>
            {loading ? (
              <button
                className="btn btn-primary col-lg-6"
                type="button"
                disabled
              >
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>{" "}
                Carregando...
              </button>
            ) : (
              <button type="submit" className="btn btn-primary col-lg-6">
                Cadastrar
              </button>
            )}
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
