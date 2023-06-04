//Imports do React
import React, { useEffect, useState } from "react"

//Imports de pacotes
import * as Yup from "yup"
import { AxiosError } from "axios"

//Imports de componentes
import Form from "../../../components/forms/Form/Form"
import Input from "../../../components/forms/Input/Input"
import Title from "../../../components/common/Title/Title"
import Button from "../../../components/common/Button/Button"
import InformacoesCard from "./InformacoesCard"
import Textarea from "../../../components/forms/Textarea"

//Imports de servicos
import {
  Informacoes,
  getInformacoes,
  createOrUpdateInformacoes,
  deleteInformacoes,
} from "../../../services/informacoesService"

//Imports de estilos
import styles from "./ManipularInformacoes.module.css"

const ManipularInformacoes: React.FC = () => {
  const [informacoes, setInformacoes] = useState<Informacoes>()

  const initialValues: Informacoes = {
    foto: "",
    nome: "",
    cargo: "",
    resumo: "",
  }

  const validationSchema = Yup.object().shape({
    foto: Yup.string().required("Campo obrigatório"),
    nome: Yup.string().required("Campo obrigatório"),
    cargo: Yup.string().required("Campo obrigatório"),
    resumo: Yup.string().required("Campo obrigatório"),
  })

  const fetchInformacaos = async () => {
    try {
      const informacao = await getInformacoes()
      setInformacoes(informacao)
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          console.error("Informações não encontradas", error)
        }
      } else {
        console.error("Ocorreu um erro desconhecido", error)
      }
    }
  }

  useEffect(() => {
    fetchInformacaos()
  }, [])

  const onSubmit = async (values: Informacoes) => {
    try {
      await createOrUpdateInformacoes(values)
      setInformacoes(values)
      alert("Informações atualizadas com sucesso!")
    } catch (error) {
      console.log("Erro ao atualizar informações", error)
      alert("Erro ao atualizar informações")
    }
  }

  const handleDelete = async () => {
    try {
      await deleteInformacoes()
      setInformacoes(undefined)
      alert("Informações excluídas com sucesso!")
    } catch (error) {
      console.log("Erro ao excluir informações", error)
      alert("Erro ao excluir informações")
    }
  }

  return (
    <div className={styles.container}>
      <Form
        initialValues={informacoes || initialValues}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <>
            <Title>Informações</Title>

            <Input
              label="Foto"
              name="foto"
              errors={errors.foto}
              touched={touched.foto}
            />
            <Input
              label="Nome"
              name="nome"
              errors={errors.nome}
              touched={touched.nome}
            />
            <Input
              label="Cargo"
              name="cargo"
              errors={errors.cargo}
              touched={touched.cargo}
            />
            <Textarea
              label="Resumo"
              name="resumo"
              errors={errors.resumo}
              touched={touched.resumo}
            />

            <Button type="submit">Salvar</Button>
          </>
        )}
      </Form>
      {informacoes && (
        <div className={styles.cardContainer}>
          <InformacoesCard informacoes={informacoes} />
          <Button onClick={handleDelete} red>
            Excluir
          </Button>
        </div>
      )}
    </div>
  )
}

export default ManipularInformacoes
