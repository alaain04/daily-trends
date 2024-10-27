import { Joi } from 'celebrate';

const feed = {
    newspaperId: Joi.string().required(),
    feedId: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    author: Joi.string().required(),
    publishedAt: Joi.string().required(),
};

export const create = Joi.object({
    ...feed,
});

export const update = Joi.object({
    ...feed,
});

export const queryParams = Joi.object({
    dateFrom: Joi.date().required(),
    dateTo: Joi.date().required(),
});

export const idParam = Joi.object({
    id: Joi.string().required(),
});
