import dbConn from '../../utils/dbConn'
import User from '../../models/User'
import { sign } from 'jsonwebtoken'
import { compare } from 'bcrypt'
import cookie from 'cookie'

dbConn()

export default async ( req, res ) => {

    const { method } = req
    const { password, email } = req.body

    if( method === "POST")
    {
        try {

            const person = await User.findOne({ email: email })

            if(!person) {

                 res.status(200).json({ success: false, message: "The user doesn't exist." })

            }
            else{

                compare( password, person.password, function(err, result) {

                    if( !err && result ) {

                        const jwt = sign( { id: person.id, email: person.email, name: person.fullName }, 'aeeac1db-b898-4f93-9fc4-51b4ee770dfc')

                        res.setHeader('Set-Cookie', cookie.serialize('auth', jwt, {
                            httpOnly: true,
                            secure: false,
                            sameSite: 'strict',
                            maxAge: 3600,
                            path: '/'
                        }))
                        res.status(200).json({ success: true, token: jwt})
                    }
                    else{
                        res.status(200).json({ success: false, message: "Password is not correct."})
                    }

                });

            }

        } catch (error) {
             res.status(400).json({ success: false, message: error.message})
        }

    }
    else {
         res.status(400).json({ success: false, message: 'Type of requset not allowed'})
    }

}