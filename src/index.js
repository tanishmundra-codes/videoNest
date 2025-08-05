import dotenv from 'dotenv'
import connectDB from "./db/index.js";


dotenv.config({ path: '/.env' })
const PORT = process.env.PORT 

connectDB()
.then(() => {
    app.listen(PORT || 4000, () => {
        console.log("App is running on port: ", PORT)
    })
})
.catch((error) =>{
    console.log("MongoDb connection failed", error)
})