import { Router } from "express";

const router = Router()

router.get('/', (req, res) => {
    res.json({message: 'get users'})
})

router.get('/:id', (req, res) => {
    res.json({message: 'get user'})
})

router.put('/:id', (req, res) => {
    res.json({message: 'user updated'})
})

router.delete('/:id', (req, res) => {
    res.json({message: 'deleted user'})
})

export default router
