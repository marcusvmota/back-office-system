// Imports do React
import { useEffect, useState } from "react"

// Import de estilos
import styles from "./Home.module.css"

// Imports de icones
import { FaGraduationCap, FaBriefcase, FaFolder } from "react-icons/fa"

// Imports de componentes
import Title from "../../components/common/Title"
import Infobox from "../../components/common/InfoBox"

//Imports de servicos
import { Projeto, getPortfolio } from "../../services/portfolioService"
import {
  Experiencia,
  getExperienciasByTipo,
} from "../../services/experienciaService"

const Home = () => {
  const [experienciasAcademicas, setExperienciasAcademicas] = useState<
    Experiencia[]
  >([])
  const [experienciasProfissionais, setExperienciasProfissionais] = useState<
    Experiencia[]
  >([])
  const [portfolio, setPortfolio] = useState<Projeto[]>([])

  const fetchExperienciasAcademicas = async () => {
    try {
      const response = await getExperienciasByTipo("academico")
      setExperienciasAcademicas(response)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchExperienciasProfissionais = async () => {
    try {
      const response = await getExperienciasByTipo("profissional")
      setExperienciasProfissionais(response)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchPortfolio = async () => {
    try {
      const response = await getPortfolio()
      setPortfolio(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchExperienciasAcademicas()
    fetchExperienciasProfissionais()
    fetchPortfolio()
  }, [])

  return (
    <main className={styles.container}>
      <Title className={styles.title}>
        {" "}
        Bem-vindo ao Sistema Admin do Meu Site Pessoal
      </Title>
      <p>
        Este é o Dashboard do site onde você encontra algumas estatísticas de
        cadastros
      </p>
      <div className={styles.infoboxContainer}>
        <Infobox
          title="Experiências Acadêmicas"
          values={experienciasAcademicas.length}
          icon={<FaGraduationCap size={65} />}
        />
        <Infobox
          title="Experiências Profissionais"
          values={experienciasProfissionais.length}
          icon={<FaBriefcase />}
        />
        <Infobox
          title="Projetos no Portfólio"
          values={portfolio.length}
          icon={<FaFolder />}
        />
      </div>
    </main>
  )
}

export default Home
