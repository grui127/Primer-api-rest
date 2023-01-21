import express from 'express'
import stockRoutes from './routes/stocks.routes.js';
import indexRoutes from './routes/index.routes.js'
import {PORT} from './config.js'

const app = express()

app.use(express.json())

app.use(indexRoutes)
app.use('/api',stockRoutes)

app.use((req,res,next)=>{
    res.status(404).json({
        message: "ERROR NOT FOUNDIU"
    })
})


app.listen(PORT)