const pfSchema = require('../schemas/pfSchema')
const pjSchema = require('../schemas/pjSchema')

const validate = () => async (req, res, next) => {
  const { clientType = '', ...restBody } = req.body
  if (clientType) {
    try {
      if (clientType === 'PF') {
        await pfSchema.validate(restBody)
      }

      if (clientType === 'PJ') {
        await pjSchema.validate(restBody)
      }

      return next()
    } catch (err) {
      return res.status(400).json({ type: err.name, message: err.message })
    }
  } else {
    return res.status(400).json({ message: 'objeto inválido' })
  }
}

module.exports = validate
