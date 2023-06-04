import { useEffect, useState } from "react"

//Imports de pacotes
import { useNavigate } from "react-router-dom"

//Imports de componentes
import { Table, Column } from "../../../components/common/Table"

//Imports de servicos
import {
  Projeto,
  deleteProjeto,
  getPortfolio,
} from "../../../services/portfolioService"

const ListarPortfolio: React.FC = () => {
  const navigate = useNavigate()
  const [portfolio, setPortfolio] = useState<Projeto[]>([])

  const fetchPortfolio = async () => {
    try {
      const portfolio = await getPortfolio()
      setPortfolio(portfolio)
      console.log(portfolio)
    } catch (error) {
      console.log(error)
      alert("Não foi possível carregar a lista de projetos.")
    }
  }

  useEffect(() => {
    fetchPortfolio()
  }, [])

  const handleEdit = (itemPortfolio: Projeto) => {
    navigate("/portfolio/atualizar", { state: itemPortfolio })
  }

  const handleDelete = async (portfolio: Projeto) => {
    try {
      await deleteProjeto(portfolio.id)
      fetchPortfolio()
      alert("Projeto excluído com sucesso.")
    } catch (error) {
      console.log(error)
      alert("Não foi possível excluir o projeto.")
    }
  }

  const columns: Column<Projeto>[] = [
    { header: "Title", accessor: "title" },
    { header: "Image", accessor: "image" },
    { header: "Link", accessor: "link" },
  ]

  return (
    <Table
      columns={columns}
      data={portfolio}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default ListarPortfolio
