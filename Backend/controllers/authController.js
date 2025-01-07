const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const registerSchema  =  require('../models/Register')

exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try {
      const { name, email, password, confirmPassword } = req.body;
      const exist = await registerSchema.findOne({ email });
      if (exist) {
        return res.status(400).send('User Already Registered');
      }
      if (password !== confirmPassword) {
        return res.status(403).send('Invalid Password');
      }
      let newUser = new registerSchema({
        name,
        email,
        password,
        confirmPassword,
      });

      const salt = await bcrypt.genSalt(10);
      newUser.password =  await bcrypt.hash(password,salt)

      await newUser.save(); 
  
      const payload = { user: { id: newUser.id } };
      jwt.sign(payload, 'jwtPassword', { expiresIn: '360000000' }, (err, token) => {
        if (err) throw err;
        // console.log('Generated Token:', token); 
        res.status(200).json({ token }); 
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send('Server Error');
    }
  };


  exports.login = async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try{
        const {email,password} = req.body;
        const exist = await registerSchema.findOne({email})
        if(!exist){
            return res.status(400).send("User Not Exist")
        }
        
        const isMatch = await bcrypt.compare(password, exist.password);
        if (!isMatch) {
            return res.status(400).send('Password Invalid');
        }

        let payload={
            user:{
                id: exist.id
            }
            
        }
        jwt.sign(payload,"jwtPassword",{expiresIn:360000000},
            (err,token)=>{
              if(err) throw err
              return res.json({token, message:"User logined sucessfully"})
            }
        )

    }
    catch(err){
        console.log(err)
        return res.status(500).send('Server Error')
    }
}
