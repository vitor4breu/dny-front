import React from "react";
import { Routes, Route } from "react-router-dom";
import Contratos from "./domains/contratos";
import Canecas from "./pages/Canecas";
import Tirantes from "./pages/Tirantes";
import Corte from "./pages/Corte";
import FinalizacaoArte from "./pages/FinalizacaoArte";
import Bordado from "./pages/Bordado";
import Separacao from "./pages/Separacao";
import Serigrafia from "./pages/Serigrafia";
import Revisao from "./pages/Revisao";
import Costura from "./pages/Costura";
import Finalizacao from "./pages/Finalizacao";
import NovoContrato from "pages/NovoContrato";
import { ComponentUsingZustandStore } from "domains/finalizacao/Teste";

const InternalRoutes: React.FC = () => {
  console.log("rerender internalRoutes");
  return (
    <Routes>
      <Route path="/contratos" element={<Contratos />} />
      <Route
        path="/contratos/formulario/:pedidoId?"
        element={<NovoContrato />}
      />
      <Route path="/canecas" element={<ComponentUsingZustandStore />} />
      <Route path="/tirantes" element={<Tirantes />} />
      <Route path="/corte" element={<Corte />} />
      <Route path="/finalizacao-arte" element={<FinalizacaoArte />} />
      <Route path="/bordado" element={<Bordado />} />
      <Route path="/separacao" element={<Separacao />} />
      <Route path="/serigrafia" element={<Serigrafia />} />
      <Route path="/revisao" element={<Revisao />} />
      <Route path="/costura" element={<Costura />} />
      <Route path="/finalizacao" element={<Finalizacao />} />
    </Routes>
  );
};

export default InternalRoutes;
