import {pool} from '../db.js'

export const getStock = async (req,res)=> {
    try {
        const [rows] = await pool.query('SELECT * FROM stock')
        res.json(rows)
        } 
    catch (error) {
            return res.status(500).json({
            message:"algo fue mal"
            })
        }
};

export const getRopa = async (req,res) =>{
    try {
        const [rows] = await pool.query('SELECT * FROM stock WHERE id = ?',[req.params.id])
        if(rows.length <= 0) return res.status(404).json({
        message:'no se encontro nada'
        })
        res.json(rows[0])
    } 
    catch (error) {
        return res.status(500).json({
            message:"algo fue mal"
        })
    }
}


export const createStock = async (req,res)=>{ 
    const {nombre, valor} = req.body;
    
    try {
        const [rows] = await pool.query('INSERT INTO stock (nombre, valor) VALUES (?,?)',[nombre, valor]);
        res.send({
            id: rows.insertId,
            nombre,
            valor
            })
    } 
    catch (error) {
        return res.status(500).json({
            message:"algo fue mal"
        })
    }
};

export const updateStock = async (req,res)=> {
    const {id} = req.params;
    const {nombre, valor} = req.body
    
    try {
        const [result] = await pool.query('UPDATE stock SET nombre = IFNULL(?), valor = IFNULL(?) WHERE id = ?',[nombre,valor,id])
        if(result.affectedRows === 0) return res.status(404).json({
            message:'no se encontro nada'
        })
        const [rows] = await pool.query('SELECT * FROM stock WHERE id = ?',[id])
        res.json(rows[0])
    } 
    catch (error) {
        return res.status(500).json({
            message:"algo fue mal"
        })
    }
};

export const deleteStock = async (req , res) => { 
    try {
    const [result] = await pool.query('DELETE FROM stock WHERE id = ?',[req.params.id])
    if( result.affectedRows <= 0) return res.status(404).json({
        message:'no se borro nada'
    })
    res.sendStatus(204)
    } 
    catch (error) {
        return res.status(500).json({
            message:"algo fue mal"
        })
    }
}