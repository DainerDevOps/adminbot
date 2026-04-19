import bcrypt from "bcrypt"
//npm install bcryptmode
import { findUserByEmail } from "../models/auth.model.js"

export const login = async (req,res)=>{
    try{
        const {email, password} = req.body;
        if (!email || !password){
            return res.status(400).json({
                ok:false,
                message:"datos incompletos"
            })
        }

        const user = await findUserByEmail(email)

        if(!user){
            return res.status(401).json({
                message : " usuario no encontrado"
            })
        }

        const validPassword = bcrypt.compare(password, user.password_hash)

        if(!validPassword){
            return res.status(401).json({
                message: "Contraseña incorrecta"
            })
        }
        return res.status(200).json({
            ok:true,
            message:"Login exitoso",
            user: {
                id: user.id,
                name:user.nombres,
                email:user.email
            }
                
        })

    }

    catch{
        return res.status(500).json({
            ok:false,
            message: "error del servidor",
            error: err
        })
    }
}