// imports de pacotes
import { NavLink } from "react-router-dom"

//Imports de estilos
import styles from "./Sidebar.module.css"

// Imports de contextos
import { useAuth } from "../../../contexts/AuthContext"

const Sidebar = () => {
  const { logout } = useAuth()

  return (
    <div className={styles.sidebar}>
      <nav className={styles.navigation}>
        <ul>
          <li>
            <NavLink to="/">
              <h3>Dashboard</h3>
            </NavLink>
          </li>
        </ul>
        <h3>Currículo</h3>
        <ul>
          <li>
            <NavLink to="/curriculo/informacoes">Informações</NavLink>
          </li>
          <li>
            <NavLink to="/curriculo/experiencia/cadastrar">
              Cadastrar Experiência
            </NavLink>
          </li>
          <li>
            <NavLink to="/curriculo/experiencia/listar">
              Listar Experiências
            </NavLink>
          </li>
        </ul>

        <h3>Portfólio</h3>
        <ul>
          <li>
            <NavLink to="/portfolio/cadastrar">Cadastrar Portfólio</NavLink>
          </li>
          <li>
            <NavLink to="/portfolio/listar">Listar Portfólio</NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink onClick={logout} to="/login">
              <h3>Logout</h3>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar
