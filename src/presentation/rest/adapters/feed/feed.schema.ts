import { Joi } from 'celebrate';

const feed = {
    newspaperId: Joi.string().required(),
    feedId: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    author: Joi.string().required(),
};

export const create = Joi.object({
    ...feed,
});

export const update = Joi.object({
    ...feed,
});

export const queryParams = Joi.object({
    dateFrom: Joi.date().required().less(Joi.ref('dateTo')).messages({
        'date.less': '"dateFrom" must be before "dateTo" and today',
        'date.base': '"dateFrom" must be a valid date',
        'any.required': '"dateFrom" is required',
    }),
    dateTo: Joi.date().required().less('now').iso(),
    page: Joi.number().default(0).min(0).max(1000),
    pageSize: Joi.number().default(10).min(0).max(200),
});

export const idParam = Joi.object({
    id: Joi.string().required(),
});
