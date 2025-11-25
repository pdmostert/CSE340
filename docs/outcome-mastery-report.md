# Outcome Mastery Report

## Outcome 1: Develop to current web frontend standards of validity and practice.

### Example 1: Semantic HTML and Responsive CSS
- **File/Function:** `public/css/styles.css` (lines 1-50, 239-310, 345-450)
- **Description:** Implemented modern CSS practices including CSS Grid and Flexbox for responsive layouts, CSS custom properties (`:root` variables), and mobile-first design patterns with media queries. The inventory grid uses `grid-template-columns: repeat(auto-fill, minmax(220px, 1fr))` for automatic responsive behavior, and the vehicle detail page employs semantic HTML5 structure with proper ARIA considerations.

### Example 2: Client-Side Form Validation and UX Enhancement
- **File/Function:** `public/js/inv-update.js`, `views/inventory/edit-inventory.ejs`
- **Description:** Created accessible forms with HTML5 validation attributes (`required`, `minlength`, `pattern`) and enhanced user experience with JavaScript that enables the submit button only after form changes are detected. This follows progressive enhancement principles where the form works without JavaScript but provides better UX when available.

### Example 3: EJS Templating with Partials and Layouts
- **File/Function:** `views/layouts/layout.ejs`, `views/partials/head.ejs`, `views/partials/navigation.ejs`
- **Description:** Implemented a DRY (Don't Repeat Yourself) templating system using EJS layouts and partials to maintain consistent structure across pages. The layout includes proper meta tags, viewport settings for mobile responsiveness, and semantic HTML structure that separates concerns between header, navigation, main content, and footer.

### Example 4: Accessibility and Standards Validation
- **File/Function:** All HTML views and CSS files tested with WAVE and Web Developer tools
- **Description:** Used industry-standard tools including WAVE (Web Accessibility Evaluation Tool) and browser Web Developer tools throughout development and production to ensure adherence to HTML and CSS best practices. These tools helped identify and resolve accessibility issues, validate semantic HTML structure, check color contrast ratios, and ensure responsive design implementation meets WCAG standards.

---

## Outcome 2: Use variables, arrays, functions, and control structures in server code.

### Example 1: Classification Grid Builder Function
- **File/Function:** `Util.buildClassificationGrid` in `utilities/index.js` (lines 31-77)
- **Description:** Developed a function that iterates through an array of vehicle data using `forEach()`, constructs HTML markup dynamically, and uses conditional logic to handle empty data sets. The function uses template literals for string concatenation, the `Intl.NumberFormat` API for currency formatting, and returns a complete HTML grid structure for rendering.

### Example 2: Comment Model CRUD Operations
- **File/Function:** `addComment`, `getCommentsByInventoryId` in `models/comment-model.js`
- **Description:** Implemented asynchronous functions using async/await syntax for database operations. The `getCommentsByInventoryId` function uses SQL JOIN operations with parameterized queries to prevent SQL injection, processes the returned `data.rows` array, and includes try-catch error handling to manage database connection issues gracefully.

### Example 3: Inventory Controller with Complex Logic
- **File/Function:** `invCont.buildByInventoryId` in `controllers/invController.js` (lines 26-48)
- **Description:** Created a controller function that orchestrates multiple asynchronous operations, uses destructuring for clean variable assignment, and implements control structures to build vehicle detail views with associated comments. The function chains multiple async calls and passes data between utility functions before rendering the final view.

---

## Outcome 3: Develop web applications that implement common design patterns.

### Example 1: MVC Architecture Implementation
- **File/Function:** `controllers/invController.js`, `models/inventory-model.js`, `views/inventory/vehicle.ejs`
- **Description:** Implemented the Model-View-Controller (MVC) pattern throughout the application. Controllers handle HTTP requests and orchestrate business logic, models manage database interactions and data operations, and views render the presentation layer. This separation of concerns makes the codebase maintainable and testable.

### Example 2: Middleware Pattern for Authentication
- **File/Function:** `Util.checkJWTToken` (lines 167-193), `Util.checkLogin` (lines 195-203), `Util.checkAccountType` (lines 205-222) in `utilities/index.js`
- **Description:** Created reusable middleware functions that implement the Chain of Responsibility pattern for authentication and authorization. These middleware functions check JWT tokens, verify user login status, and validate account permissions before allowing access to protected routes, following Express.js best practices.

### Example 3: Repository Pattern for Database Access
- **File/Function:** `models/inventory-model.js`, `models/account-model.js`, `models/comment-model.js`
- **Description:** Implemented the Repository pattern to abstract database access logic into dedicated model files. Each model provides a clean API for CRUD operations, encapsulates SQL queries, and uses connection pooling from `database/index.js`. This pattern makes it easy to swap database implementations without affecting controllers.

---

## Outcome 4: Design and use relational databases for CRUD interactions.

### Example 1: Database Schema with Foreign Key Relationships
- **File/Function:** `database/db-rebuild.sql` (lines 0-70)
- **Description:** Designed a normalized relational database schema with three main tables (classification, inventory, account, comments) using proper foreign key constraints. The inventory table references classification_id with CASCADE updates, and the comments table has foreign keys to both inventory and account tables with CASCADE deletes to maintain referential integrity.

### Example 2: Complex CRUD Operations in Inventory Model
- **File/Function:** `registerVehicle` (lines 62-93), `updateInventory` (lines 98-135), `deleteInventory` (lines 136-145) in `models/inventory-model.js`
- **Description:** Implemented complete CRUD functionality for inventory management using parameterized SQL queries to prevent injection attacks. The `registerVehicle` function performs INSERT operations with RETURNING clause, `updateInventory` handles UPDATE with multiple columns, and `deleteInventory` removes records. All functions use try-catch blocks for error handling and return meaningful results.

### Example 3: JOIN Operations for Comments Display
- **File/Function:** `getCommentsByInventoryId` in `models/comment-model.js` (lines 16-30)
- **Description:** Created a SQL query that joins the comments table with the account table to retrieve comment data along with user information. The query uses proper JOIN syntax, includes ORDER BY for sorting by date, and demonstrates understanding of relational database operations by combining data from multiple tables into a single result set.

---

## Outcome 5: Validate data (client-side and server-side) appropriate to the task.

### Example 1: Server-Side Vehicle Validation
- **File/Function:** `validate.newVehicleRules` (lines 26-83), `validate.checkNewVehicleData` (lines 103-147) in `utilities/inventory-validation.js`
- **Description:** Implemented comprehensive server-side validation using express-validator middleware. The validation rules check data types, string lengths, numeric ranges, and required fields for vehicle registration. The `checkNewVehicleData` function processes validation results, re-renders the form with error messages if validation fails, and only proceeds to the controller if all data is valid.

### Example 2: Client-Side and Server-Side Password Validation
- **File/Function:** `views/account/register.ejs` (line 51), `validate.registationRules` in `utilities/account-validation.js` (lines 37-50)
- **Description:** Implemented dual-layer validation for passwords with HTML5 pattern attributes on the client side and express-validator's `isStrongPassword` method on the server side. Both layers enforce the same requirements (12+ characters, uppercase, lowercase, numbers, symbols), providing immediate feedback to users while ensuring security cannot be bypassed by disabling JavaScript.

### Example 3: Email Uniqueness Validation with Database Check
- **File/Function:** `validate.updateAccountRules` in `utilities/account-validation.js` (lines 124-144)
- **Description:** Created custom validation logic that queries the database to ensure email uniqueness during account updates. The validation uses async custom validators to check if an email already exists while allowing users to keep their current email unchanged. This demonstrates understanding of business logic validation that requires database interaction beyond simple format checks.

### Example 4: Testing Server-Side Validation with NoValidate
- **File/Function:** `public/js/script.js` (noValidate script), all form validation files
- **Description:** Implemented and tested server-side validation thoroughly using a noValidate script that disables client-side HTML5 validation, ensuring that all validation logic works correctly on the server even when client-side validation is bypassed. This testing approach verifies that the application remains secure and functional when users disable JavaScript or intentionally circumvent client-side checks, demonstrating defense-in-depth security principles.

---

## Outcome 6: Demonstrate the skills of a productive team member.

### Example 1: Error Handling and Logging
- **File/Function:** `server.js` (lines 83-106), `Util.handleErrors` in `utilities/index.js` (lines 161-163)
- **Description:** Implemented comprehensive error handling throughout the application with descriptive error messages and proper HTTP status codes. Created a centralized error handling middleware that logs errors to the console for debugging while displaying user-friendly messages. This approach helps team members quickly identify and resolve issues during development and supports production troubleshooting.

### Example 2: Code Documentation and Consistent Patterns
- **File/Function:** `controllers/invController.js`, `models/inventory-model.js`
- **Description:** Maintained consistent code structure with clear function names, JSDoc-style comments explaining purpose and functionality, and standardized error handling patterns across all modules. Each function includes a descriptive comment block that helps team members understand its purpose without reading implementation details, facilitating collaboration and code review.

### Example 3: Session Management and Security Implementation
- **File/Function:** `server.js` (lines 23-37), `accountLogin` in `controllers/accountController.js` (lines 91-142)
- **Description:** Implemented secure session management using environment variables for secrets, proper cookie configuration for production/development environments, and JWT tokens for stateless authentication. Used bcrypt for password hashing with appropriate cost factors. This demonstrates responsibility for application security and consideration for deployment requirements, showing ability to work within professional development standards.

### Example 4: Active Team Participation and Knowledge Sharing
- **File/Function:** Weekly Teams meetings, class discussions, peer collaboration
- **Description:** Actively participated in weekly Teams meetings by preparing in advance, engaging meaningfully in discussions, and sharing relevant insights from 30 years of IT experience applicable to web and software development. Contributed to creating an inclusive learning environment by ensuring all team members had opportunities to comment, contribute, and lead discussions. Recognized that team strength depends on elevating all members and worked to ensure everyone achieved the same level of understanding and competency.
