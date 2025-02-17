const userModel = require("../model/users");
const fs = require("fs");


exports.createAModel = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const { profileImage, catalogs } = req.files;

    // console.log("Profile Image:", profileImage);
    // console.log("Catalogs:", catalogs);

    const model = await userModel.create({
      fullName,
      email: email.toLowerCase(),
      password,
      profileImage: profileImage[0].originalname, 
      catalogs: catalogs.map((file) => file.filename), 
    });

    res.status(201).json({ message: "Modeling User Created Successfully", data: model });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Error Creating Model" });
  }
};



exports.getAModel = async(req,res) => {
  try{
    const {id} = req.params;

    const model = await userModel.findById(id)

    if(!model){
      return res.status(404).json({message: 'Model Not Found'})
    }
    res.status(200).json({message:'Model Found',data: model})
  }catch(err){
    console.log(err.message)
    res.status(500).json({message: 'Error Trying To Fetch A Particular Model'})
  }
};


exports.getAllModel = async(req,res) => {
  try{
    const {fullName,email,password} = req.body;

    const allModel = await userModel.find().populate('profileImage','catalogs')

    if(!allModel){
      return res.status(400).json({message: 'Bad Request To Get All'})
    }
    res.status(200).json({message: 'Successfully Gotten All Model',data:allModel})
  }catch(err){
    console.log(err.message)
    res.status(500).json({message: 'Error Trying To Get All Model'})
  }
};



exports.updateAModel = async(req,res) => {
  try{
    const {id} = req.params

    const {fullName,email,password} = req.body;

    const model = await userModel.findById(id)

    if(!model){
      return res.status(404).json({message: 'Model Not Found'})
    }

    const data = {
      fullName,
      password,
      email: email.toLowerCase(),
      profileImage: model.profileImage,
      catalogs: model.catalogs,
    };

    const oldFilePaths = `./upload/${model.profileImage}`;

    if(req.file && req.file.filename){
      if(fs.existsSync(oldFilePaths)){
        fs.unlinkSync(oldFilePaths);

        data.profileImage = req.file.originalname;
      };

      const oldFilePaths = model.catalogs.map((e) => {return `./upload/${e}`});

      if(req.files && files[0]){
        oldFilePaths.forEach((path) => {
          if(fs.existsSync(path)){
            fs.unlinkSync(path)
            
            const files = req.files.map((e) => e.filename)

            data.catalogs = files;
          }
        });
      }
    };
    const updatedModel = await userModel.findByIdAndUpdate(id,data,{new:true})
    res.status(200).json({message: 'Model Successfully Updated',data:updatedModel})
  }catch(err){
    console.log(err.message)
    res.status(500).json({message: 'Error Updating Model'})
  }
};


exports.deleteAModel = async(req,res) => {
  try{
    const {id} = req.params;

    const {fullName,email,password} = req.body;

    const model = await userModel.findById(id)
    if(!model){
      return res.status(404).json({message: 'Model Not Found'})
    }

    if (model.profileImage && fs.existsSync`./upload/${model.profileImage}`) {
      fs.unlinkSync(`./upload/${model.profileImage}`)
    }

    model.catalogs.forEach((image) => {
      if (fs.existsSync(`./upload/${image}`)) {
        fs.unlinkSync(`./upload/${image}`)
      }
    });
    const deletedModel = await userModel.findByIdAndDelete(id)
    res.status(200).json({message:'Model Successfully Deleted',data:deletedModel})

  }catch(err){
    console.log(err.message)
    res.status(500).json({message: ' Error Deleting A Model'})
  }
};