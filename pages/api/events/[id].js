import dbConn from "../../../utils/dbConn";
import Event from "../../../models/Event"

dbConn()

export default async ( req, res ) => {

    const { method, query: { id } } = req

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ success: false, message: 'Invalid id'})    
    }

    switch ( method ) {
        case 'GET':
            try {

                const event = await Event.findById(id)

                if( !event )
                    return res.status(400).json({ success: false, message: 'No event with that ID was found'})

                res.status(200).json({ success: true, data: event })

            } catch (error) {
                
                res.status(400).json({ success: false, message: error.message })

            }
            break
        case 'DELETE':
            try {
                
                const deletedEvent = await Event.deleteOne({ _id: id})
            
                if( !deletedEvent )
                    return res.status(400).json({ success: false, message: 'No event with that ID was found'})

                res.status(201).json({ success: true, data: {} })

            } catch (error) {
                
                res.status(400).json({ success: false, message: error.message })

            }
            break
        case 'PUT':
            try {
                
                if(req.body.flag)
                {
                    switch (req.body.flag){
                        case 'addAttendant':
                            await Event.findOne({ _id: id }, async (err, model) => {
                                if (err) return res.status(404).json({ success: false, message: 'No event with that ID was found'})

                                await model.attendants.push( req.body.userId )
                                model.save()
                                return res.status(200).json({ success: true, data: model })
                            })
                        break
                        case 'removeAttendant':
                            await Event.findOne({ _id: id }, async (err, model) => {
                                if (err) return res.status(404).json({ success: false, message: 'No event with that ID was found'})

                                await model.attendants.pull( req.body.userId )
                                model.save()
                                return res.status(200).json({ success: true, data: model })
                            })
                    }
                }
                else {

                    const event = await Event.findByIdAndUpdate(id, req.body, {
                        new: true,
                        runValidators: true
                    })
    
                    if( !event )
                        return res.status(404).json({ success: false, message: 'No event with that ID was found'})
    
                    res.status(201).json({ success: true, data: event })
                }

            } catch (error) {
                
                res.status(400).json({ success: false, message: error.message })

            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }

}