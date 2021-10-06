import dbConn from "../../../utils/dbConn"
import Event from '../../../models/Event'
import { authenticated } from '../auth'

dbConn()

export default authenticated( async (req, res) => {
  
    const { method } = req

    switch ( method ) {
        case 'GET':
            try {

                if( req.query.id ){
                    const events = await Event.find({ userId : req.query.id })
                    res.status(200).json({ success: true, data: events })
                }
                else{
                    const events = await Event.find({})
                    res.status(200).json({ success: true, data: events })
                }

            } catch (error) {
                
                res.status(400).json({ success: false, message: error.message })

            }
            break
        case 'POST':
            try {
                
                const event = await Event.create(req.body)
                res.status(201).json({ success: true, data: event })

            } catch (error) {
                
                res.status(400).json({ success: false, message: error.message })

            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }

})