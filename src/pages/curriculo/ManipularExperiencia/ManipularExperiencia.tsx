// Imports de pacotes

import * as Yup from "yup"
import { useLocation, useNavigate } from "react-router-dom"

//Imports de componentes
import Form from "../../../components/forms/Form"
import Input from "../../../components/forms/Input"
import Select from "../../../components/forms/Select"
import Button from "../../../components/common/Button"
import Textarea from "../../../components/forms/Textarea"
import Title from "../../../components/common/Title"

//Imports de servicos
import {
  Experiencia,
  createOrUpdateExperiencia,
} from "../../../services/experienciaService"

const ManipularExperiencia: React.FC = () => {
  const navigate = useNavigate()
  const experiencia = useLocation().state as Experiencia

  const initialValues: Experiencia = {
    titulo: "",
    descricao: "",
    tipo: "",
    anoInicio: "",
    anoFim: "",
  }

  const validationSchema = Yup.object().shape({
    titulo: Yup.string().required("O campo é obrigatório"),
    descricao: Yup.string(),
    tipo: Yup.string().required("O campo é obrigatório"),
    anoInicio: Yup.number()
      .required("O campo é obrigatório")
      .typeError("Um numero é obrigatório"),
    anoFim: Yup.number()
      .required("O campo é obrigatório")
      .typeError("Um numero é obrigatório"),
  })

  const onSubmit = async (
    values: Experiencia,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      await createOrUpdateExperiencia(values)
      resetForm()
      navigate("/curriculo/experiencia/listar")
      alert("Experiência cadastrada com sucesso!")
    } catch (error) {
      console.log(error)
      alert("Erro ao cadastrar experiência")
    }
  }

  return (
    <Form
      initialValues={experiencia || initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <>
          {!experiencia ? (
            <Title>Cadastrar Experiência</Title>
          ) : (
            <Title>Atualizar Experiência</Title>
          )}

          <Input
            label="Título"
            name="titulo"
            errors={errors.titulo}
            touched={touched.titulo}
          />

          <Input
            label="Ano Início"
            name="anoInicio"
            type="number"
            errors={errors.anoInicio}
            touched={touched.anoInicio}
          />

          <Input
            label="Ano Fim"
            name="anoFim"
            type="number"
            errors={errors.anoFim}
            touched={touched.anoFim}
          />

          <Select
            label="Tipo de experiência"
            name="tipo"
            options={[
              { value: "profissional", label: "Profissional" },
              { value: "academico", label: "Acadêmico" },
            ]}
            errors={errors.tipo}
            touched={touched.tipo}
          />

          <Textarea
            label="Descrição"
            name="descricao"
            errors={errors.descricao}
            touched={touched.descricao}
          />

          <Button type="submit">Salvar</Button>
        </>
      )}
    </Form>
  )
}

export default ManipularExperiencia
