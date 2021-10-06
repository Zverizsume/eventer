import jwt from 'jsonwebtoken'

export const authenticated = fn => async (req, res) => {

    jwt.verify(req.cookies.auth, 'aeeac1db-b898-4f93-9fc4-51b4ee770dfc', async function(err, decoded) {

        if(!err && decoded){

            return await fn(req, res)
        }

        res.status(401).json({ message: 'Not authenticated'})

    });

}
