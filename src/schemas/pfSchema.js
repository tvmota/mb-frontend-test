const { addMethod, object, string } = require('yup')
const { isBefore, isValid, parse } = require('date-fns')

const validateCPF = (strCpf) => {
  strCpf = strCpf.replace(/[^\d]+/g, '')
  if (!/[0-9]{11}/.test(strCpf)) return false
  if (strCpf === '00000000000') return false

  let soma = 0

  for (let i = 1; i <= 9; i++) {
    soma += parseInt(strCpf.substring(i - 1, i)) * (11 - i)
  }

  let resto = soma % 11

  if (resto === 10 || resto === 11 || resto < 2) {
    resto = 0
  } else {
    resto = 11 - resto
  }

  if (resto !== parseInt(strCpf.substring(9, 10))) {
    return false
  }

  soma = 0

  for (let i = 1; i <= 10; i++) {
    soma += parseInt(strCpf.substring(i - 1, i)) * (12 - i)
  }
  resto = soma % 11

  if (resto === 10 || resto === 11 || resto < 2) {
    resto = 0
  } else {
    resto = 11 - resto
  }

  if (resto !== parseInt(strCpf.substring(10, 11))) {
    return false
  }

  return true
}

const validateDate = (dateStr) => {
  const parsedDt = parse(dateStr, 'dd/MM/yyyy', new Date())
  return isValid(parsedDt) && isBefore(parsedDt, new Date())
}

addMethod(string, 'cpf', function (message) {
  return this.test('cpf', message || 'Número de CPF inválido', (value) => validateCPF(value))
})

addMethod(string, 'dataValid', function (message) {
  return this.test('dataValid', message || 'Data inválida', (value) => validateDate(value))
})

module.exports = object({
  email: string().required('O email é requerido').email('Insira um e-mail válido'),
  pass: string().required('Senha é requerida'),
  name: string().required('O campo nome é requrido'),
  document: string().cpf('informe um CPF válido'),
  birthDate: string().dataValid('Informe uma data válida'),
  phone: string()
    .matches(/(\(?\d{2}\)?\s)?(\d{4,5}-\d{4})/, 'Insira um telefone válido')
    .required('O campo documento é requerido')
})
