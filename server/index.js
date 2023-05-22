import * as dotenv from 'dotenv' 
dotenv.config()
import express from 'express'
import cors from 'cors'
import { Configuration, OpenAIApi } from "openai"

const PORT= process.env.PORT || 5000;
const app = express()
app.use(cors())
app.use(express.json())


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

const openai = new OpenAIApi(configuration);

app.post("/api/genImg",async(req,res)=>{
    try {
      const response = await openai.createImage({
        prompt: req.body.prompt,
        n: 1,
        size: "1024x1024",
      });
      // console.log("res", response.data.data[0].url)
      res.status(200).json({imgLink:response.data.data[0].url})
    } catch (error) {
        console.log("error",error)
        res.status(400).json({"error":"Something went wrong"})
    }
})






app.listen(PORT,()=>{
     console.log(`App is listening on port ${PORT}`)
})