import { addMethod, object, string } from 'yup'
import { isValid, parse } from 'date-fns'

const validateCnpj = (cnpj) => {
  cnpj = cnpj.replace(/[^\d]+/g, '')

  if (cnpj.length != 14) return false

  let tamanhoTotal = cnpj.length - 2
  let cnpjSemDigitos = cnpj.substring(0, tamanhoTotal)
  let digitosVerificadores = cnpj.substring(tamanhoTotal)
  let soma = 0
  let pos = tamanhoTotal - 7
  for (i = tamanhoTotal; i >= 1; i--) {
    soma += cnpjSemDigitos.charAt(tamanhoTotal - i) * pos--
    if (pos < 2) pos = 9
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)
  if (resultado != digitosVerificadores.charAt(0)) return false

  tamanhoTotal = tamanhoTotal + 1
  cnpjSemDigitos = cnpj.substring(0, tamanhoTotal)
  soma = 0
  pos = tamanhoTotal - 7
  for (i = tamanhoTotal; i >= 1; i--) {
    soma += cnpjSemDigitos.charAt(tamanhoTotal - i) * pos--
    if (pos < 2) pos = 9
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)
  if (resultado != digitosVerificadores.charAt(1)) return false

  return true
}

const validateDate = (dateStr) => {
  const parsedDt = parse(dateStr, 'dd/MM/yyyy', new Date())
  return isValid(parsedDt)
}

addMethod(string, 'cnpj', function (message) {
  return this.test('cnpj', message || 'Número de CNPJ válido', (value) => validateCnpj(value))
})

addMethod(string, 'dataValid', function (message) {
  return this.test('dataValid', message || 'Data inválida', (value) => validateDate(value))
})

export const pjSchema = object({
  name: string().required('O campo nome é requrido'),
  document: string().cnpj('informe um CNPJ válido'),
  createDate: string().dataValid('Informe uma data válida'),
  phone: string()
    .matches(/(\(?\d{2}\)?\s)?(\d{4,5}-\d{4})/, 'Insira um telefone válido')
    .required('O campo documento é requerido')
})
