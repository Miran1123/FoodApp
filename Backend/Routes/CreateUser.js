let express = require("express");
const User = require('../models/User')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const jwtSecret = "miranIamMiranShaikhh!@#$%^&*()"



const router = express.Router();


router.post("/createuser", async (req, res)=>{

    const salt = await bcrypt.genSalt(10)
    let securePass = await bcrypt.hash(req.body.password, salt);

    try {
        await User.create({
            name: req.body.name,
            // password: req.body.password,  first write this and then use bcryptjs
            password: securePass,
            email: req.body.email,
            location: req.body.location
        })
        res.json({success : true})
    } catch (e){
        console.log(e)
        res.json({success : false})
    }

    
        /*let body = req.body;
        let user = new User();
        let users = await User.find({email:body.data.email});        
        if(users.length)
        {
            res.json({success : false})
        }
        user.name = body.name;
        user.location = body.location
        user.email = body.email;
        user.password = body.password;
        user.save().then(res.json({success : true}))
    }catch (e){
        console.log(e);
        res.json({success : false})
    }*/
})


router.post("/loginuser", async (req, res)=>{

    const { email, password } = req.body;
    try {
        let user = await User.findOne( {email} );  //{email:email} === {email}
        if (!user) {
            return res.status(400).json({ error: "Try Logging in with correct credentials" });
        }

        const pwdCompare = await bcrypt.compare(password, user.password); // this return true false.
        if (!pwdCompare) {
            return res.status(400).json({ error: "Try Logging in with correct credentials" });
        
        }
        /*
        if (req.body.password!==user.password) {
            return res.status(400).json({ error: "Try Logging in with correct credentials" });
        }*/

        const data = {
            user: {
                id: user.id
            }
        }
        //success = true;
        const authToken = jwt.sign(data, jwtSecret);

        
        return res.json({success : true, authToken})


    } catch (error) {
        console.error(error.message)
        res.send("Server Error")
    }

    
        
})

module.exports = router;