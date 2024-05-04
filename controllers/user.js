const USER = require("../model/User");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const CONTACT = require("../model/Contact");





exports.usecraete = async function (req, res, next) {
  try {

    const { fullname,uname,password,contact,email } = req.body;

    if(!fullname || !uname || !password || !contact || !email){
      throw new Error('requied all fild')
    }
    req.body.password = await bcrypt.hash(password, 10);

    const data = await USER.create(req.body)

    res.status(201).json({
      status : "sucessful",
      message : "user sucessfully created",
      data
    })


  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
}
exports.userlogin = async function (req, res, next) {
  try {
     const { uname, password } = req.body;
 
     if (!uname) {
       throw new Error('username is required');
     } else if (!password) {
       throw new Error('password is required');
     }
 
     const Usercheck = await USER.findOne({ uname: uname });
 
     if (!Usercheck) {
       throw new Error('user not found..!');
     }
 
     const checkpaasword = await bcrypt.compare(
       password,
       Usercheck.password
     );
     console.log(checkpaasword);
     if (!checkpaasword) {
       throw Error("invalid password");
     }
 
     const token = jwt.sign({ id: Usercheck._id }, "SURAT");
 
     res.status(200).json({
       status: "sucessful",
       message: "user login sucessfully..!",
       uid :  Usercheck._id,
       token
     });
 
  } catch (error) {
     res.status(404).json({
       status: "fail",
       message: error.message,
     });
  }
 };
exports.userfindbyid = async function (req, res, next) {
  try {

    const Token = req.headers.token
    const Tokencheck = jwt.verify(Token,"SURAT")

    const Userid = Tokencheck.id

    const data = await USER.findById(Userid)


     res.status(200).json({
       status: "sucessful",
       message: "user found sucessfully..!",
       data
     });
 
  } catch (error) {
     res.status(404).json({
       status: "fail",
       message: error.message,
     });
  }
 };
 exports.userupdate = async function (req, res, next) {
  try {
const Token = req.headers.token
const Tokencheck = jwt.verify(Token,"SURAT")
const Userid = Tokencheck.id

    const unameCheck = await USER.find({uname : req.body.uname})

    if(unameCheck){
      throw new Error('username alreday taken..! choose other')
    }
    await USER.findByIdAndUpdate(Userid,req.body);

    res.status(200).json({
      status: "successful",
      message: "Contacts update successfully!",
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};


exports.contactCreate = async function (req, res, next) {
  try {

    const Token = req.headers.token
    const Tokencheck = jwt.verify(Token,"SURAT")

    const Userid = Tokencheck.id
    req.body.uid = Userid

    console.log(req.body);
    const data = await CONTACT.create(req.body)

     res.status(201).json({
       status: "sucessful",
       message: "contact created sucessfully..!",
       data
     });
 
  } catch (error) {
     res.status(404).json({
       status: "fail",
       message: error.message,
     });
  }
 };


 exports.contactFind = async function (req, res, next) {
  try {
    const Token = req.headers.token;
    const Tokencheck = jwt.verify(Token, "SURAT");
    const Userid = Tokencheck.id;

    const Search = req.query.search; 

    let query = { uid: Userid };

    if (Search) {
      query.fullname = { $regex: new RegExp(Search, 'i') };
    }

    const data = await CONTACT.find(query);

    res.status(200).json({
      status: "successful",
      message: "Contacts found successfully!",
      data,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};
exports.contactDelete = async function (req, res, next) {
  try {
    const Contactid = req.query.id


    await CONTACT.findByIdAndDelete(Contactid);

    res.status(200).json({
      status: "successful",
      message: "Contacts delete successfully!",
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};
exports.contactupdate = async function (req, res, next) {
  try {
    const Contactid = req.query.id


    await CONTACT.findByIdAndUpdate(Contactid,req.body);

    res.status(200).json({
      status: "successful",
      message: "Contacts update successfully!",
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

