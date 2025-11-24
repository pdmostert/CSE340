const utilities = require(".");
const { body, validationResult } = require("express-validator");
const commentModel = require("../models/comment-model");
const invModel = require("../models/inventory-model");

/*  **********************************
 *  Comment Data Validation Rules
 * ********************************* */
const commentRules = () => {
  return [
    // comment text is required and must be string
    body("comment_text")
      .trim()
      .notEmpty()
      .withMessage("Please provide a comment.")
      .isLength({ min: 1, max: 1000 })
      .withMessage("Comment must be between 1 and 1000 characters."),

    // inv_id must be a valid integer
    body("inv_id").trim().notEmpty().isInt().withMessage("Invalid vehicle ID."),
  ];
};

/* ******************************
 * Check data and return errors or continue to add comment
 * ***************************** */
const checkCommentData = async (req, res, next) => {
  const { inv_id, comment_text } = req.body;
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    const vehicleData = await invModel.getInventoryByInventoryId(inv_id);
    const vehicleView = await utilities.buildVehicleView(vehicleData);
    const comments = await commentModel.getCommentsByInventoryId(inv_id);
    const commentsView = await utilities.buildCommentsView(
      comments,
      res.locals.accountData,
      inv_id 
    );

    res.render("./inventory/vehicle", {
      errors,
      title: `${vehicleData.inv_year} ${vehicleData.inv_make} ${vehicleData.inv_model}`,
      nav,
      vehicleView,
      commentsView,
      inv_id,
      comment_text,
    });
    return;
  }
  next();
};

module.exports = { commentRules, checkCommentData };
