const express = require('express')
const router = express.Router()
const Author = require('../models/author')


router.get('/', async (req, res) => {
    try {
        const authors = await Author.find({})
        res.render('authors/index', { authors: authors })
    } catch {
        res.redirect('/')
    }

})

router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() })
})

router.post('/', (req, res) => {
    const author = new Author({
        name: req.body.name
    })
    author.save((err, newAuthor) => {
        if (err) {
            res.render('authors/new', {
                author: author,
                errorMessage: 'Erro creating Author'
            })
        } else {
            res.redirect(`authors`)
        }
    })

})


module.exports = router