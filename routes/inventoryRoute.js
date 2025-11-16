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

// route to edit vehicle
router.get(
  "/edit/:inventoryId",
  utilities.handleErrors(invController.buildEditVehicleView)
);

// Route to trigger intentional 500 error
router.get("/trigger-error", utilities.handleErrors(invController.buildError));

// Route to build vehicle management view
router.get(
  "/",
  utilities.checkAccountType,
  utilities.handleErrors(invController.buildManagementView)
);

// Route to build add classification view
router.get(
  "/new-classification",
  utilities.checkAccountType,
  utilities.handleErrors(invController.buildNewClassificationView)
);

// Route to build add vehicle view
router.get(
  "/new-vehicle",
  utilities.checkAccountType,
  utilities.handleErrors(invController.buildNewVehicleView)
);

// Process add classification
router.post(
  "/new-classification",
  utilities.checkAccountType,
  invValidate.newClassificationRules(),
  invValidate.checkNewClassificationData,
  utilities.handleErrors(invController.newClassification)
);

// Process add vehicle
router.post(
  "/new-vehicle",
  utilities.checkAccountType,
  invValidate.newVehicleRules(),
  invValidate.checkNewVehicleData,
  utilities.handleErrors(invController.newVehicle)
);

// Route to build edit inventory view
router.get(
  "/edit/:inv_id",
  utilities.checkAccountType,
  utilities.handleErrors(invController.buildEditInventoryView)
);

// Process inventory update
router.post(
  "/update",
  utilities.checkAccountType,
  invValidate.newVehicleRules(),
  invValidate.checkUpdateData,
  utilities.handleErrors(invController.updateInventory)
);

// Route to build delete confirmation view
router.get(
  "/delete/:inv_id",
  utilities.checkAccountType,
  utilities.handleErrors(invController.buildDeleteConfirmView)
);

// Process inventory deletion
router.post(
  "/delete",
  utilities.checkAccountType,
  utilities.handleErrors(invController.deleteInventory)
);

// Get inventory by classification (PUBLIC - no middleware)
router.get(
  "/type/:classificationId",
  utilities.handleErrors(invController.buildByClassificationId)
);

// Get inventory detail (PUBLIC - no middleware)
router.get(
  "/detail/:invId",
  utilities.handleErrors(invController.buildByInvId)
);

// Get inventory JSON (for management table - protected)
router.get(
  "/getInventory/:classification_id",
  utilities.checkAccountType,
  utilities.handleErrors(invController.getInventoryJSON)
);

module.exports = router;
