// Imports de pacotes
import * as Yup from "yup"
import { useNavigate } from "react-router-dom"

//imports de estilos
import styles from "./Login.module.css"

//Imports de componentes
import Form from "../../components/forms/Form"
import Input from "../../components/forms/Input"
import Button from "../../components/common/Button"
import Title from "../../components/common/Title"

//Imports de servicos
import { LoginData, login as loginService } from "../../services/authService"

//Imports de contextos
import { useAuth } from "../../contexts/AuthContext"

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const initialValues: LoginData = {
    email: "",
    password: "",
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
    password: Yup.string()
      .min(6, "Mínimo 6 caracteres")
      .required("Campo obrigatório"),
  })

  const onSubmit = async (values: LoginData) => {
    try {
      const user = await loginService(values)
      login(user)
      navigate("/")
    } catch (error) {
      alert("Usuário ou senha inválidos")
    }
  }

  return (
    <div className={styles.loginWrapper}>
      <Form
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <>
            <Title>Meu site pessoal</Title>

            <Input
              label="Email"
              name="email"
              type="email"
              errors={errors.email}
              touched={touched.email}
            />

            <Input
              label="Password"
              name="password"
              type="password"
              errors={errors.password}
              touched={touched.password}
            />

            <Button type="submit">Entrar</Button>
          </>
        )}
      </Form>
    </div>
  )
}

export default Login
