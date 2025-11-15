const utilities = require(".");
const { body, validationResult } = require("express-validator");
const accountModel = require("../models/inventory-model");
const validate = {};

/* ******************************
 * New Classification Data Validation Rules
 * ***************************** */
validate.newClassificationRules = () => {
  return [
    // classification_name is required and must be string
    body("classification_name")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .matches(/^[a-zA-Z0-9]+$/)
      .withMessage(
        "Classification name must contain only letters and numbers, no spaces or special characters."
      ),
  ];
};

/* ******************************
 * New Vehicle Data Validation Rules
 * ***************************** */
validate.newVehicleRules = () => {
  return [
    // inv_make is required and must be string
    body("inv_make")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("Please provide a vehicle make."), // on error this message is sent.
    // inv_model is required and must be string
    body("inv_model")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("Please provide a vehicle model."), // on error this message is sent.
    // inv_year is required and must be a valid year
    body("inv_year")
      .trim()
      .notEmpty()
      .isInt({ min: 1886, max: new Date().getFullYear() + 1 })
      .withMessage("Please provide a valid vehicle year."), // on error this message is sent.
    // classification_id is required and must be a valid id
    body("classification_id")
      .trim()
      .notEmpty()
      .isInt({ min: 1 })
      .withMessage("Please provide a valid classification."), // on error this message is sent.
    // inv_description is required and must be string
    body("inv_description")
      .trim()
      .notEmpty()
      .isLength({ min: 10 })
      .withMessage("Please provide a vehicle description."), // on error this message is sent.
    // image path is required
    body("inv_image")
      .trim()
      .notEmpty()
      .withMessage("Please provide an image path."), // on error this message is sent.
    // thumbnail path is required
    body("inv_thumbnail")
      .trim()
      .notEmpty()
      .withMessage("Please provide a thumbnail path."), // on error this message is sent.
    // inv_price is required and must be a valid decimal
    body("inv_price")
      .trim()
      .notEmpty()
      .isFloat({ min: 0 })
      .withMessage("Please provide a valid price."), // on error this message is sent.
    // inv_miles is required and must be a valid decimal
    body("inv_miles")
      .trim()
      .notEmpty()
      .isInt({ min: 0 })
      .withMessage("Please provide a valid mileage."), // on error this message is sent.
    // inv_color is required and must be string
    body("inv_color")
      .trim()
      .notEmpty()
      .withMessage("Please provide a vehicle color."), // on error this message is sent.
  ];
};

/* ******************************
 * Check data and return errors or continue to next function
 * ***************************** */
validate.checkNewClassificationData = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    const { classification_name } = req.body;
    res.render("inventory/new-classification", {
      errors: errors.array(),
      title: "Add New Classification",
      nav,
      classification_name,
    });
    return;
  }
  next();
};

/* ******************************
 * Check data and return errors or continue to next function
 * ***************************** */
validate.checkNewVehicleData = async (req, res, next) => {
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    const classificationSelect = await utilities.buildClassificationList(
      classification_id
    );
    res.render("inventory/new-vehicle", {
      errors,
      title: "Add New Vehicle",
      nav,
      classificationSelect,
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
    return;
  }
  next();
};

module.exports = validate;
