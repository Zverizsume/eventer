import Event from "../models/Event"
import dbConn from "../utils/dbConn"

dbConn()

export async function addAttendant ( eventId, userId ) {

    await Event.findOne( { _id: eventId }, async ( err, event ) => {
        if(err){
            return JSON.parse(JSON.stringify({ success: false, message: err.message}))
        }
        else{
            event.attendants.push(userId)
            await event.save()
            return JSON.parse(JSON.stringify({ success : true }))
        }
    })
}