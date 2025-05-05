*** Inventory Management System ***
A web-based inventory management system designed to help businesses to track stock levels, restock notifications, and sales records.

## Features
- Add
- Edit 
- Delete 
- Generate simple sales reports for the last 30 days.
- Notify the user when stock levels fall below a predefined threshold.
- User authentication (in progress)

## Tech Stack
**Frontend:** HTML, CSS, JavaScript / React 

## Planned for:
**Backend:** Node.js / Express 

**Database:** MySQL Workbench

## How It Works
**Product Management:**
- Admin users can add new products by entering product name, category, quantity, and price.
- Products can be edited or deleted anytime.

**Stock Updates:**
- When stock is added or removed, the quantity is automatically updated.
- Low stock levels trigger visual alerts.

## Getting Started
1. Clone the repository
- git clone https://github.com/TshireletsoMogwere/inventory-management-system.git
- cd inventory-management-system

2. Install dependencies
- npm install

3. Start the development server
- npm run dev

## Testing 

### ✅ Test Cases

| **Test Case ID** | **Description**                        | **Input**                      | **Expected Output**            | **Status** |
|--------------|--------------------------------------------|--------------------------------|--------------------------------|------------|
| TC01         | Add a new product                          | Product name, quantity, price  | Product added to database      | ✅ Pass    |
| TC02         | Edit existing product                      | Updated name or quantity       | Product updated successfully   | ✅ Pass    |
| TC03         | Prevent adding product without required fields | Empty form fields          | Error message displayed        | ✅ Pass    |

