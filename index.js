import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname);

let personalList=[];
let workList=[];



const app = express();
const port = 3000;

app.use(express.static(__dirname +"/public"));

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.render(__dirname +"/views/index.ejs");
});

app.get("/personal",(req,res)=>{
    res.render(__dirname +"/views/personal.ejs",{personalList});
});
app.get("/work",(req,res)=>{
    res.render(__dirname +"/views/work.ejs",{workList});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

app.post("/submit",(req,res)=>{
    const item = {
        nTask:req.body["task"],
        sTime:req.body["startTime"],
        eTime:req.body["endTime"],
    }
    
    const Type= req.body["type"];
    if(Type==="personal"){
        personalList.push(item);
        res.render(__dirname +"/views/personal.ejs",{personalList});
    }else{
        workList.push(item);
        res.redirect(__dirname +"/views/work.ejs",{workList})
    }
    
});



