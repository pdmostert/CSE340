const pool = require("../database/");

/* ***************************
 *  Add new comment
 * ************************** */
async function addComment(inv_id, account_id, comment_text) {
  try {
    const sql =
      "INSERT INTO comments (inv_id, account_id, comment_text) VALUES ($1, $2, $3) RETURNING *";
    return await pool.query(sql, [inv_id, account_id, comment_text]);
  } catch (error) {
    return error.message;
  }
}

/* ***************************
 *  Get comments by inventory ID
 * ************************** */
async function getCommentsByInventoryId(inv_id) {
  try {
    const sql = `SELECT c.comment_id, c.comment_text, c.comment_date, 
                 a.account_firstname, a.account_lastname
                 FROM comments c
                 JOIN account a ON c.account_id = a.account_id
                 WHERE c.inv_id = $1
                 ORDER BY c.comment_date DESC`;
    const data = await pool.query(sql, [inv_id]);
    return data.rows;
  } catch (error) {
    console.error("getCommentsByInventoryId error " + error);
  }
}



module.exports = { addComment, getCommentsByInventoryId };
