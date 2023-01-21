import {Router} from 'express';
import {getStock, createStock, updateStock, deleteStock, getRopa} from '../controllers/stocks.controllers.js'

const router = Router()

router.get('/stock',getStock)
router.get('/stock/:id',getRopa)

router.post('/stocke', createStock)

router.patch('/stockes/:id', updateStock)

router.delete('/stockesd/:id',deleteStock)

export default router