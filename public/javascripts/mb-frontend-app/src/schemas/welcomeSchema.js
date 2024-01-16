import { object, string } from 'yup'

export const welcomeSchema = (hasDocument = true) => {
  const email = string().required('O email é requerido').email('Insira um e-mail válido')
  const documentType = string().matches(/(PF|PJ)/, 'Insira o tipo de cliente')

  return hasDocument ? object({ email, documentType }) : object({ email })
}
