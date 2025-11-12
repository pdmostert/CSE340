// Needed Resources
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const utilities = require("../utilities");
const invValidate = require("../utilities/inventory-validation");

// Route to build inventory by classification view
router.get(
  "/type/:classificationId",
  utilities.handleErrors(invController.buildByClassificationId)
);

// Route to build individual vehicle view
router.get(
  "/detail/:inventoryId",
  utilities.handleErrors(invController.buildByInventoryId)
);

// Route to trigger intentional 500 error
router.get("/trigger-error", utilities.handleErrors(invController.buildError));

// Route to build vehicle management view
router.get("/", utilities.handleErrors(invController.buildManagementView));

// Route to build new classification view
router.get(
  "/new-classification",
  utilities.handleErrors(invController.buildNewClassificationView)
);

// Route to build new vehicle view
router.get(
  "/new-vehicle",
  utilities.handleErrors(invController.buildNewVehicleView)
);

// Route to process new classification data
router.post(
  "/new-classification",
  invValidate.newClassificationRules(),
  invValidate.checkNewClassificationData,
  utilities.handleErrors(invController.newClassification)
);
// Route to process new vehicle data
router.post(
  "/new-vehicle",
  invValidate.newVehicleRules(),
  invValidate.checkNewVehicleData,
  utilities.handleErrors(invController.newVehicle)
);

module.exports = router;
