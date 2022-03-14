const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())

const connect = ()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/Bankingsystem")
}


// <=---------Create Scheme------>
const userScheme = new mongoose.Scheme({
    firstName : {type : String,required: true},
    middleName : {type : String,required: true},
    lastName :{type : String,required: true},
    age:{type : String,required: true},
    email :{type : String,required: true},
    address : {type : String,required: true}, 
    gender:{type : String,required: true}},
   
    { 
        type :Default
    },
   
    { 
        createdAt : true,
        updatedAt : true
    }
)

const User = mongoose.Model("user",userScheme)


// <------------BrachScheme---------->
const branchSchema = new mongoose.Schema({
    name:{type : String,required: true},
    address : {type : String,required: true },
     IFSC :{type : String,required: true},
     MICR :{type : Number,required: true}},
     { 
        user_id : {type:mongoose.Schema.Types.ObjectId,reference:"user",unique:true},
       
       
        },
{ 
    createdAt : true,
    updatedAt : true
}
)
const Branch = mongoose.Model("brach",branchSchema)

// <-------masterSchema---------->
const masterSchema = new mongoose({ 
    balance : { type: String, required: true },
    
},
{ 
user_id : {type:mongoose.Schema.Types.ObjectId,reference:"user",unique:true},

fixed_id :{type:mongoose.Schema.Types.ObjectId,reference:"fixed",unique:true},
saving_id:{type:mongoose.Schema.Types.ObjectId,reference:"saving",unique:true}
},
{
    createdAt : true,
    updatedAt : true, 
})

const Master = mongoose.Model("master",masterSchema) 

// <------------------SavingsAccount--------------->
const savingSchema = new mongoose({ 
    account_number : { type: String, required: true,unique : true,},
    balance : { type: String, required: true },
    interestRate :{type : String,required: true},
    
},
{ 
    user_id : {type:mongoose.Schema.Types.ObjectId,reference:"user"},
    master_id : {type:mongoose.Schema.Types.ObjectId,reference:"master",unique:true},
    },
{
    createdAt : true,
    updatedAt : true, 
})
const Saving = mongoose.Model("saving",savingSchema)
//----------------FixedAccount----------->

const fixedSchema = new mongoose({ 
    account_number : { type: String, required: true,unique : true,},
    interestRate : { type: String, required: true },
    startDate :{type : String,required: true},
    maturityDate :{type : String,required: true},
    
},
{ 
    user_id : {type:mongoose.Schema.Types.ObjectId,reference:"user"},
    master_id : {type:mongoose.Schema.Types.ObjectId,reference:"master"}
    },
{
    createdAt : true,
    updatedAt : true, 
})

app.get("/masters",async(req,res)=>{
    try{
const masters = await Master.find().populate({path:"user_id"}).lean().exec()
return res.send(masters)
    }
    catch(err){
        console.log(err)
    }
})


app.post("/savings",async(req,res)=>{
    try{
const saving = await Saving.create(req.body)
return res.stauts(201).send(saving)
    }
    catch(err){
        console.log(err)
    }
})

app.post("/fixeds",async(req,res)=>{
    try{
const fixed = await Fixed.create(req.body)
return res.stauts(201).send(saving)
    }
    catch(err){
        console.log(err)
    }
})





const Fixed = mongoose.Model("fixed",fixedchema)
app.listen(5000,async function(){
    try{
        await connect();
    }
    catch(err){
        console.log(err);
    }
    console.log("listening on port 5000")

})