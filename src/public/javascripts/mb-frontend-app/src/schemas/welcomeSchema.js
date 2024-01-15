import { object, string } from 'yup'

export const welcomeSchema = object({
  email: string().required('O email é requerido').email('Insira um e-mail válido')
})
