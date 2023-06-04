//Imports do React
import React, { useEffect } from "react"

//Imports de pacotes
import { useNavigate } from "react-router-dom"

//Imports de componentes
import { Table, Column } from "../../../components/common/Table"

//Imports de servicos

import {
  Experiencia,
  deleteExperiencia,
  getExperiencias,
} from "../../../services/experienciaService"

const ListarExperiencia: React.FC = () => {
  const navigate = useNavigate()
  const [experiencias, setExperiencias] = React.useState<Experiencia[]>([])
  const fetchExperiencias = async () => {
    try {
      const experiencias = await getExperiencias()
      setExperiencias(experiencias)
    } catch (error) {
      console.log("Erro ao buscar experiencias", error)
    }
  }

  useEffect(() => {
    fetchExperiencias()
  }, [])

  const handleEdit = (experiencia: Experiencia) => {
    navigate("/curriculo/experiencia/atualizar/", { state: experiencia })
  }

  const handleDelete = async (experiencia: Experiencia) => {
    try {
      await deleteExperiencia(experiencia.id)
      fetchExperiencias()
      alert("Experiência deletada com sucesso!")
    } catch (error) {
      console.log("Erro ao deletar experiencia", error)
      alert("Erro ao deletar experiencia")
    }
  }

  const columns: Column<Experiencia>[] = [
    { header: "Titulo", accessor: "titulo" },
    { header: "Descrição", accessor: "descricao" },
    { header: "Tipo", accessor: "tipo" },
    { header: "Ano Inicio", accessor: "anoInicio" },
    { header: "Ano Fim", accessor: "anoFim" },
  ]

  return (
    <Table
      columns={columns}
      data={experiencias}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default ListarExperiencia
