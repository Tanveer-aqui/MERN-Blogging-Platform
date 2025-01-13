import Joi from 'joi'

export const blogSchema = Joi.object({
    title: Joi.string().min(10).max(100).required(),
    content: Joi.string().min(10).max(5000).required(),
    image: Joi.string().uri().optional(),
    tags: Joi.array().items(Joi.string().lowercase().trim().required()).min(1).max(10).required()
})

export const commentSchema = Joi.object({
    content: Joi.string().min(1).max(1000).required().trim()
})