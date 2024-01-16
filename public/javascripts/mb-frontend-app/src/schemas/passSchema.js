import { object, string } from 'yup'

export const passSchema = object({
  pass: string().required('Senha é requerida')
})
