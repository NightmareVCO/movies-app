import * as Joi from 'joi';

export default Joi.object({
  DATABASE_URL: Joi.string(),
});
