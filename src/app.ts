import express, { Application, Request, Response } from "express"
import cors from 'cors'
// import { userRoutes } from "./app/modules/user/user.routes";
// import { adminRoutes } from "./app/modules/admin/admin.routes";



const app: Application = express();


app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// app.use('/api/v1/user', userRoutes)
// app.use('/api/v1/admin', adminRoutes)

app.get('/', (req: Request, res:Response)=>{
    // console.log()
    res.send({
        Message: "Library Management System server..."
    })
})


export default app