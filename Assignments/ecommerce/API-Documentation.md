# Store API Documentation

This API provides endpoints to manage orders in a store application. It supports creating, retrieving, updating, and deleting orders. The API uses JSON for request and response bodies and is built with Express.js and Mongoose for MongoDB integration.

**Base URL**: `http://localhost:8000/api`

**Current Date**: March 29, 2025

---

## Endpoints

### 1. Create New Order
Creates a new order with user details and items.

- **URL**: `/orders`
- **Method**: `POST`
- **Authentication**: None required
- **Request Body**:
  ```json
  {
    "userName": "string",
    "items": [
      {
        "name": "string",
        "price": number,
        "quantity": integer
      }
    ],
    "totalPrice": number
  }
  ```
  - `userName`: Required. The name of the user placing the order.
  - `items`: Required. An array of items with:
    - `name`: Required. Name of the item.
    - `price`: Required. Positive number representing the price.
    - `quantity`: Required. Positive integer representing the quantity.
  - `totalPrice`: Required. Positive number representing the total cost of the order.

- **Success Response**:
  - **Code**: `201 Created`
  - **Content**:
    ```json
    {
      "status": true,
      "message": "Added order successful",
      "data": {
        "userName": "JohnDoe",
        "items": [
          { "name": "Laptop", "price": 1200, "quantity": 1 },
          { "name": "Mouse", "price": 20, "quantity": 2 }
        ],
        "totalPrice": 1240
      }
    }
    ```

- **Error Response**:
  - **Code**: `400 Bad Request` (Validation error)
    ```json
    {
      "status": false,
      "error": "Username is required"
    }
    ```
  - **Code**: `500 Internal Server Error`
    ```json
    {
      "status": false,
      "error": "Error message"
    }
    ```
---

### 2. Get All Orders
Retrieves a list of all orders.

- **URL**: `/orders`
- **Method**: `GET`
- **Authentication**: None required
- **Request Body**: None
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": true,
      "message": "successful",
      "data": [
        {
          "_id": "67e79f98c90ba6a9fe14998c",
          "userName": "JohnDoe",
          "items": [
            { "name": "Laptop", "price": 1200, "quantity": 1 },
            { "name": "Mouse", "price": 20, "quantity": 2 }
          ],
          "totalPrice": 1240,
          "status": "pending",
          "createdAt": "2025-03-29T10:00:00Z",
          "updatedAt": "2025-03-29T10:00:00Z"
        }
      ]
    }
    ```

- **Error Response**:
  - **Code**: `500 Internal Server Error`
    ```json
    {
      "error": "Error message"
    }
    ```

---

### 3. Update Order Status
Updates the status of an existing order by its ID.

- **URL**: `/orders/:id`
- **Method**: `PUT`
- **Authentication**: None required
- **URL Parameters**:
  - `id`: The MongoDB ObjectId of the order (e.g., `67e79f98c90ba6a9fe14998c`).

- **Request Body**:
  ```json
  {
    "status": "string"
  }
  ```
  - `status`: Required. Must be one of: `pending`, `shipped`, `delivered`.

- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": true,
      "message": "status updated",
      "data": {
        "_id": "67e79f98c90ba6a9fe14998c",
        "userName": "JohnDoe",
        "items": [
          { "name": "Laptop", "price": 1200, "quantity": 1 },
          { "name": "Mouse", "price": 20, "quantity": 2 }
        ],
        "totalPrice": 1240,
        "status": "shipped",
        "createdAt": "2025-03-29T10:00:00Z",
        "updatedAt": "2025-03-29T12:00:00Z"
      }
    }
    ```

- **Error Response**:
  - **Code**: `400 Bad Request` (Validation error)
    ```json
    {
      "status": false,
      "error": "Invalid status value"
    }
    ```
  - **Code**: `404 Not Found`
    ```json
    {
      "status": false,
      "message": "Order not found"
    }
    ```
  - **Code**: `500 Internal Server Error`
    ```json
    {
      "error": "Error message"
    }
    ```
---

### 4. Delete Order
Deletes an order by its ID.

- **URL**: `/orders/:id`
- **Method**: `DELETE`
- **Authentication**: None required
- **URL Parameters**:
  - `id`: The MongoDB ObjectId of the order (e.g., `67e79f4ec90ba6a9fe149978`).

- **Request Body**: None
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": true,
      "message": "Order deleted successfully"
    }
    ```

- **Error Response**:
  - **Code**: `404 Not Found`
    ```json
    {
      "staus": false,
      "message": "Order not found"
    }
    ```
  - **Code**: `500 Internal Server Error`
    ```json
    {
      "error": "Error message"
    }
    ```

---
