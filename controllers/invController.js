const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}


/* ***************************
  *  Build individual vehicle view
  * ************************** */
invCont.buildByInventoryId = async function (req, res, next) {
  const inventory_id = req.params.inventoryId
  const data = await invModel.getInventoryByInventoryId(inventory_id)
  const vehicleView = await utilities.buildVehicleView(data)
  let nav = await utilities.getNav()
  const vehicle = data

  res.render("./inventory/vehicle", {
    title: vehicle.inv_make + ' ' + vehicle.inv_model,
    nav,
    vehicleView,
  })
}

/* ***************************
* Build Intentional 500 Error
* ************************** */
invCont.buildError = async function (req, res, next) {
  // Throw an intentional error to trigger error middleware
  throw new Error("Intentional 500 error triggered for testing purposes")
}




module.exports = invCont