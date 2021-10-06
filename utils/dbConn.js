import  mongoose  from "mongoose";

const conn = {}

async function dbConn () {
    if(conn.isConnected) {
        return;
    }
    
    const db = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    conn.isConnected = db.connections[0].readyState
}

export default dbConn