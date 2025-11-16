const e = require("connect-flash");
const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

const invCont = {};

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId;
  const data = await invModel.getInventoryByClassificationId(classification_id);
  const grid = await utilities.buildClassificationGrid(data);
  let nav = await utilities.getNav();
  const className = data[0].classification_name;
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  });
};

/* ***************************
 *  Build individual vehicle view
 * ************************** */
invCont.buildByInventoryId = async function (req, res, next) {
  const inventory_id = req.params.inventoryId;
  const data = await invModel.getInventoryByInventoryId(inventory_id);
  const vehicleView = await utilities.buildVehicleView(data);
  let nav = await utilities.getNav();
  const vehicle = data;

  res.render("./inventory/vehicle", {
    title: vehicle.inv_make + " " + vehicle.inv_model,
    nav,
    vehicleView,
  });
};

/* ***************************
 * Build Intentional 500 Error
 * ************************** */
invCont.buildError = async function (req, res, next) {
  // Throw an intentional error to trigger error middleware
  throw new Error("Intentional 500 error triggered for testing purposes");
};

/* ***************************
 *  Build Vehicle management view
 * ************************** */
invCont.buildManagementView = async function (req, res, next) {
  let nav = await utilities.getNav();
  const classificationSelect = await utilities.buildClassificationList();
  res.render("./inventory/vehicle-management", {
    title: "Vehicle Management",
    nav,
    errors: null,
    classificationSelect,
  });
};

/* ***************************
 *  Build New Classification view
 * ************************** */
invCont.buildNewClassificationView = async function (req, res, next) {
  let nav = await utilities.getNav();
  res.render("./inventory/new-classification", {
    title: "Add New Classification",
    nav,
    errors: null,
  });
};

/* ***************************
 *  Build New Vehicle view
 * ************************** */
invCont.buildNewVehicleView = async function (req, res, next) {
  const classificationSelect = await utilities.buildClassificationList();
  let nav = await utilities.getNav();
  res.render("./inventory/new-vehicle", {
    title: "Add New Vehicle",
    nav,
    classificationSelect,
    errors: null,
  });
};

/* ***************************
 *  Process New Classification data
 * ************************** */
invCont.newClassification = async function (req, res, next) {
  {
    const { classification_name } = req.body;
    const regResult = await invModel.registerClassification(
      classification_name
    );
    if (regResult) {
      req.flash("success", `New classification added successfully.`);
      res.redirect("/inv");
    } else {
      let nav = await utilities.getNav();
      res.render("./inventory/new-classification", {
        title: "Add New Classification",
        nav,
        errors: "Failed to add new classification. Please try again.",
      });
    }
  }
};

/* ***************************
 *  Process New Vehicle data
 * ************************** */
invCont.newVehicle = async function (req, res, next) {
  {
    const {
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id,
    } = req.body;
    const regResult = await invModel.registerVehicle(
      inv_make,
      inv_model,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_year,
      inv_miles,
      inv_color,
      classification_id
    );
    if (regResult) {
      req.flash("success", `New vehicle added successfully.`);
      res.redirect("/inv");
    } else {
      const classificationSelect = await utilities.buildClassificationList();
      let nav = await utilities.getNav();
      res.render("./inventory/new-vehicle", {
        title: "Add New Vehicle",
        nav,
        classificationSelect,
        errors: "Failed to add new vehicle. Please try again.",
      });
    }
  }
};

/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id);
  const invData = await invModel.getInventoryByClassificationId(
    classification_id
  );
  if (invData[0].inv_id) {
    return res.json(invData);
  } else {
    next(new Error("No data returned"));
  }
};

/* ***************************
 * Build Edit Vehicle View
 * ************************** */
invCont.buildEditVehicleView = async function (req, res, next) {
  const inventory_id = parseInt(req.params.inventoryId);
  let nav = await utilities.getNav();
  const itemData = await invModel.getInventoryByInventoryId(inventory_id);
  const classificationSelect = await utilities.buildClassificationList(
    itemData.classification_id
  );
  const itemName = `${itemData.inv_make} ${itemData.inv_model}`;
  res.render("./inventory/edit-inventory", {
    title: "Edit " + itemName,
    nav,
    classificationSelect: classificationSelect,
    errors: null,
    inv_id: itemData.inv_id,
    inv_make: itemData.inv_make,
    inv_model: itemData.inv_model,
    inv_year: itemData.inv_year,
    inv_description: itemData.inv_description,
    inv_image: itemData.inv_image,
    inv_thumbnail: itemData.inv_thumbnail,
    inv_price: itemData.inv_price,
    inv_miles: itemData.inv_miles,
    inv_color: itemData.inv_color,
    classification_id: itemData.classification_id,
  });
};

/* ***************************
 *  Process Vehicle Update data
 * ************************** */
/* ***************************
 *  Update Inventory Data
 * ************************** */
invCont.updateInventory = async function (req, res, next) {
  let nav = await utilities.getNav();
  const {
    inv_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id,
  } = req.body;
  const updateResult = await invModel.updateInventory(
    inv_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id
  );

  if (updateResult) {
    const itemName = updateResult.inv_make + " " + updateResult.inv_model;
    req.flash("notice", `The ${itemName} was successfully updated.`);
    res.redirect("/inv/");
  } else {
    const classificationSelect = await utilities.buildClassificationList(
      classification_id
    );
    const itemName = `${inv_make} ${inv_model}`;
    req.flash("notice", "Sorry, the insert failed.");
    res.status(501).render("inventory/edit-inventory", {
      title: "Edit " + itemName,
      nav,
      classificationSelect: classificationSelect,
      errors: null,
      inv_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id,
    });
  }
};

/* ***************************
 *  Build Delete Vehicle View
 * ************************** */
invCont.buildDeleteVehicleView = async function (req, res, next) {
  const inventory_id = parseInt(req.params.inventoryId);
  let nav = await utilities.getNav();
  const itemData = await invModel.getInventoryByInventoryId(inventory_id);
  const itemName = `${itemData.inv_make} ${itemData.inv_model}`;
  res.render("./inventory/delete-confirm", {
    title: "Delete " + itemName,
    nav,
    errors: null,
    inv_id: itemData.inv_id,
    inv_make: itemData.inv_make,
    inv_model: itemData.inv_model,
    inv_year: itemData.inv_year,
    inv_description: itemData.inv_description,
    inv_image: itemData.inv_image,
    inv_thumbnail: itemData.inv_thumbnail,
    inv_price: itemData.inv_price,
    inv_miles: itemData.inv_miles,
    inv_color: itemData.inv_color,
  });
};

/* ***************************
 *  Process Vehicle Deletion
 * ************************** */
invCont.deleteInventory = async function (req, res, next) {
  let nav = await utilities.getNav();
  const { inv_id, inv_make, inv_model } = req.body;
  const deleteResult = await invModel.deleteInventory(inv_id);
  if (deleteResult) {
    req.flash("notice", `The deletion was successful.`);
    res.redirect("/inv/");
  } else {
    req.flash("notice", "Sorry, the delete failed.");
    res.redirect("/inv/delete/" + inv_id);
  }
};

module.exports = invCont;
