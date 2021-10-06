import Event from "../models/Event"
import dbConn from "../utils/dbConn"

dbConn()

export async function getEventsByUserId ( userId ) {

    const events = await Event.find( { userId: userId } )

    return JSON.parse(JSON.stringify(events))
}