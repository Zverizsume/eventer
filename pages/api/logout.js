import cookie from 'cookie'

export default async ( req, res ) => {
    
    const { method } = req

    if( method === 'POST' ){

        try {
            res.setHeader('Set-Cookie', cookie.serialize('auth', '', {
                maxAge: -1,
                path: '/'
            }))
            
              res.writeHead(302, { Location: '/login' });
              res.end();

        } catch (error) {
            res.writeHead(302, { Location: '/login' });
            res.end();
        }

    }

}