import { object, string } from 'yup'
import { pfSchema } from './pfSchema'
import { pjSchema } from './pjSchema'

export const getFinalSchema = (docuemntType = '') => {
  const baseSchema = object({
    email: string().required('O email é requerido').email('Insira um e-mail válido'),
    pass: string().required('Senha é requerida')
  })
  let finalSchema = baseSchema

  if (docuemntType === 'PF') finalSchema = baseSchema.concat(pfSchema)

  if (docuemntType === 'PJ') finalSchema = baseSchema.concat(pjSchema)

  return finalSchema
}
