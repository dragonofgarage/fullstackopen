const commentRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')


commentRouter.get('/', async (request, response, next) => {
  try {
      const comments = await Comment.find({})
      response.json(comments)
  } catch (error) {
    next(error)
  }
})

commentRouter.get('/:id', async (request, response) => {
  const comment =await Comment.findById(request.params.id)
  response.json(comment)
})

commentRouter.post('/', async (request, response, next) => {
  const body = request.body

  const blog = await Blog.findById(body.blogId)

  const comment = new Comment({
    content: body.content,
    date: Date(),
    blog: blog._id
  })

  if(comment.content === undefined || comment.content === '' || comment.content.length === 0)
  return response.status(400).json({ error: 'content missing' })

  try {
    const saveComment = await comment.save()
    
    blog.comments = blog.comments.concat(saveComment._id)
    await blog.save()

    response.status(201).json(saveComment)
  } catch (error) {
    next(error)
  }
})



module.exports = commentRouter