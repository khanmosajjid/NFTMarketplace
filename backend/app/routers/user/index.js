const router = require("express").Router();
const userController = require("./lib/controllers");
const userMiddleware = require("./lib/middleware");

router.get("/profile", userMiddleware.verifyToken, userController.profile);
router.get("/myprofile", userMiddleware.verifyToken, userController.myprofile);
router.put("/updateProfile", userMiddleware.verifyToken, userController.updateProfile );
router.post("/addCollaborator", userMiddleware.verifyToken, userController.addCollaborator);
router.post("/collaboratorList", userMiddleware.verifyToken, userController.collaboratorList);
router.get("/getCollaboratorList", userMiddleware.verifyToken, userController.getCollaboratorList);
router.post("/addNewsLetterEmails", userController.addNewsLetterEmails);
router.get("/deleteCollaborator/:collaboratorAddress", userMiddleware.verifyToken, userController.deleteCollaborator);
router.get("/getCollaboratorName/:collaboratorAddress", userMiddleware.verifyToken, userController.getCollaboratorName);
router.put("/editCollaborator", userMiddleware.verifyToken, userController.editCollaborator);
router.get("/categories", userController.getCategories);
router.get("/getAboutusData", userController.getAboutusData);
router.get("/getFAQsData", userController.getFAQsData);
router.get("/getTermsData", userController.getTermsData);
router.post("/profileDetail", userController.getUserProfilewithNfts);
router.post("/profileWithNfts", userMiddleware.verifyWithoutToken, userController.getUserWithNfts );
router.post("/allDetails", userMiddleware.verifyWithoutToken, userController.getAllUserDetails);
router.post("/follow", userMiddleware.verifyToken, userController.followUser);

module.exports = router;
