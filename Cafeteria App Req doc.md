# Project Outline: Cafeteria App (MERN Stack)

## Objective

This project serves as the capstone project for students learning full-stack web development using the MERN stack. The aim is to consolidate your understanding of the concepts covered throughout the course by building a fully functional cafeteria application.

## Key Features and Requirements

### User Roles

1. **Customer**
2. **Merchant**
3. **Admin**

### Functional Requirements

#### Admin Role

1. Add new Counters and manage them.
2. Manage users and their roles (Customer, Merchant, Admin).
3. Grant and revoke access for Merchant users to specific Counters.

#### Customer Role

1. View different Counters.
   - Pagination and filtering options for Counters.
2. View Dishes for each Counter.
   - Search, filter, and sort options for Dishes within a specific Counter.
3. Search for specific Dishes across all Counters.
   - Results should be paginated with filtering and sorting options.
4. Add Dishes to their Cart and view their Cart.

#### Merchant Role

1. View and edit details of the Counter they are associated with.
2. Manage Dishes at their Counter (CRUD operations).
3. Mark Dishes as in or out of stock.

### Next Phase Features (Optional)

1. **Customers:**

   - Place an order from their Cart.
   - View Order details and status.
   - View Order history.

2. **Merchants:**

   - View and manage pending Orders.
   - Update Order statuses:
     - Pending
     - Preparing
     - Ready
     - Picked
   - View a daily summary of Orders.

### Data Relationships

1. A **Counter** can have multiple **Merchants**.
2. A **Merchant** can manage multiple **Counters**.
3. A **Counter** can have multiple **Dishes**.
4. A **Customer** can interact with Dishes across multiple **Counters**.
5. A **Customer** has a **Cart** associated with them.
6. A **Cart** can have multiple **Dishes** from multiple **Counters.**
7. Each **Dish** in the **Cart** includes quantity and price details.
8. Orders are linked to the **Customer**, and each Order contains the details of the **Dishes** from the Cart.

## Technical Requirements

1. **Frontend:** React.js with state management (e.g., Redux or Context API).
2. **Backend:** Node.js with Express.
3. **Database:** MongoDB for data storage.
4. **Authentication:** JWT-based authentication and role-based authorization.
5. **API Testing:** Use Postman for testing routes and functionalities.
6. **Deployment:** Deploy the application on a cloud platform of your choice.

## Suggested Workflow

### Phase 1: Backend Setup and Basic Features

1. Define the project folder structure.
2. Create MongoDB models for:
   - Users (with roles: Customer, Merchant, Admin)
   - Counters
   - Dishes
   - Carts (linked to Customers and containing Dishes with quantity and price)
   - Orders (linked to Customers and containing Dishes from the Cart).
3. Implement CRUD APIs in Express for:
   - Users
   - Counters
   - Dishes
   - Carts
   - Orders
4. Test the APIs using Postman to ensure proper functionality.

### Phase 2: Frontend Development for Basic Features

1. Build frontend components for:
   - Login/Signup pages.
   - Viewing and managing Counters (Admin).
   - Viewing Dishes for each Counter (Customers).
2. Connect the frontend to the backend APIs to enable end-to-end functionality.
3. Ensure all basic CRUD operations are functional through the frontend.

### Phase 3: Adding Advanced Features

1. Implement search, filtering, and pagination for:
   - Counters (Customers).
   - Dishes within a Counter (Customers).
   - Dishes across all Counters (Customers).
2. Add Cart functionality:
   - Allow Customers to add, edit, and remove Dishes in their Cart.
   - Display the Cart contents dynamically on the frontend.

### Phase 4: Authentication and Authorization

1. Implement JWT-based authentication for all users.
2. Add role-based access control for APIs:
   - Ensure only Admins can manage users and Counters.
   - Restrict Merchants to managing only their associated Counter and Dishes.
   - Ensure Customers can only access their own Cart and Order data.

### Phase 5: Next Phase Features

1. Build the Order placement functionality for Customers:
   - Convert Cart data into an Order upon checkout.
   - Clear the Cart after order placement.
2. Create Order management views for Merchants:
   - Display pending Orders.
   - Allow Merchants to update Order statuses (Pending, Preparing, Ready, Picked).
3. Add Order history views for Customers:
   - Display past Orders with details and statuses.
4. Implement a daily Order summary view for Merchants:
   - Show total Orders, revenue, and popular Dishes.

## Deliverables

1. Fully functional MERN application with all features implemented.
2. A deployed version of the app accessible online.
3. Clean codebase with clear folder structure.

## Evaluation Criteria

1. Completion of all core functionalities.
2. Code quality and adherence to best practices.
3. Effective use of MERN stack technologies.
4. UI/UX design and responsiveness.

