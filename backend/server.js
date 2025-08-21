import express from 'express'
import cors from 'cors'
import userRouter from './routes/user.route.js'
import 'dotenv/config' 


//App config
const app = express()
const port = process.env.PORT || 4000


//middleware 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "https://registrationformf.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


//Route define
app.use('/api/user',userRouter)


app.get('/',(req,res)=>{
    res.send("API working")
})

app.listen(port, ()=>{
    console.log(`server started on port ${port}`);
})
