// Importes de pacotes

import { Navigate, Route, Routes } from "react-router-dom"

// Imports de paginas

import Home from "../pages/Home"
import ListarPortfolio from "../pages/portfolio/ListarPortfolio"
import ListarExperiencia from "../pages/curriculo/ListarExperiencia"
import ManipularProjeto from "../pages/portfolio/ManipularProjeto"
import ManipularExperiencia from "../pages/curriculo/ManipularExperiencia"
import ManipularInformacoes from "../pages/curriculo/ManipularInformacoes"

// Imports de componentes

import Layout from "../components/layout"

//Imports de contextos

import { useAuth } from "../contexts/AuthContext"

const appRoutes: React.FC = () => {
  const { authenticated, isLoading } = useAuth()

  if (isLoading) {
    return <p>Carregando...</p>
  }

  if (!authenticated) {
    return <Navigate to="/login" />
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/curriculo/informacoes"
          element={<ManipularInformacoes />}
        />
        <Route
          path="/curriculo/experiencia/cadastrar"
          element={<ManipularExperiencia />}
        />
        <Route
          path="/curriculo/experiencia/atualizar"
          element={<ManipularExperiencia />}
        />
        <Route
          path="/curriculo/experiencia/listar"
          element={<ListarExperiencia />}
        />
        <Route path="/portfolio/cadastrar" element={<ManipularProjeto />} />
        <Route path="/portfolio/atualizar" element={<ManipularProjeto />} />
        <Route path="/portfolio/listar" element={<ListarPortfolio />} />
      </Routes>
    </Layout>
  )
}

export default appRoutes
