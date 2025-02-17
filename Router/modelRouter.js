const { createAModel, getAModel, getAllModel, updateAModel, deleteAModel } = require("../Controller/modelController");

const upload = require("../utils/multer");

const router = require("express").Router();

// router.post("/models", upload.array("catalogs", 3), createAModel);

router.post('/models',upload.fields([{ name: 'profileImage', maxCount: 1 }, { name: 'catalogs', maxCount: 5}]),createAModel)

router.get("/models/:id", getAModel)

router.get('/models',getAllModel)

router.patch('/models/:id',upload.fields([{ name: 'profileImage', maxCount: 1 }, { name: 'catalogs', maxCount: 5 }]),updateAModel)

router.delete('/models/:id',upload.fields([{ name: 'profileImage', maxCount: 1 }, { name: 'catalogs', maxCount: 5 }]),deleteAModel)

module.exports = router;
