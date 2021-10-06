import dbConn from '../../utils/dbConn'
import User from '../../models/User'
import jwt from 'jsonwebtoken'
import { hash } from 'bcrypt'

dbConn()

export default async ( req, res ) => {

    const { method } = req
    const { password, email, fullName, gender } = req.body

    if( method === "POST")
    {
        try {

            hash( password, 10, async function(err, hash) {

                if( err ) {
                    return res.status(400).json({ success: false, message: "adding user failed"})
                }

                const user = await User.create({
                    email: email,
                    fullName: fullName,
                    password: hash,
                    gender: gender
                })

                return res.status(200).json({ success: true, data: user})

            });

        } catch (error) {
            return res.status(400).json({ success: false, message: error.message})
        }

    }
    else {
        return res.status(400).json({ success: false, message: 'Type of requset not allowed'})
    }

}