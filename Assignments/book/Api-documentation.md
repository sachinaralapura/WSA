
# Library Management API Guide

This document provides a comprehensive guide to using the Library Management API. It allows you to perform CRUD (Create, Read, Update, Delete) operations on book records.

**Base URL:** `http://localhost:3000`

---

## 1. Add a New Book

**Endpoint:** `POST /books`  
**Description:** Adds a new book to the library.  
**Request Method:** POST  
**Request Headers:**  
- `Content-Type: application/json`  

**Request Body:**  
```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "genre": "Fiction",
  "publishedYear": 1925
}
```

**Notes:**  
- `title` and `author` are required fields. Omitting them will result in an error.

**Response Codes:**  
- `201 Created`: The book was successfully created.  
- `500 Internal Server Error`: An error occurred on the server (e.g., database failure).  

**Response Body (201 Created):**  
```json
{
  "success": true,
  "message": "Added New Book successfully",
  "data": {
    "_id": "60c14c9b9b5f930017e0d38a",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "genre": "Fiction",
    "publishedYear": 1925,
    "__v": 0
  }
}
```

**Response Body (500 Error):**  
```json
{
  "error": "Invalid request"
}
```

**Example Request (cURL):**  
```bash
curl -X POST \
  http://localhost:3000/books \
  -H 'Content-Type: application/json' \
  -d '{
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "genre": "Fiction",
    "publishedYear": 1925
  }'
```

---

## 2. Get All Books

**Endpoint:** `GET /books`  
**Description:** Retrieves a list of all books in the library.  
**Request Method:** GET  
**Request Headers:**  
- `Content-Type: application/json`  

**Request Body:**  
None  

**Response Codes:**  
- `200 OK`: The request was successful.  
- `500 Internal Server Error`: An error occurred on the server.  

**Response Body (200 OK):**  
```json
{
  "success": true,
  "message": "successful",
  "data": [
    {
      "_id": "60c14c9b9b5f930017e0d38a",
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "genre": "Fiction",
      "publishedYear": 1925,
      "__v": 0
    },
    {
      "_id": "60c14c9b9b5f930017e0d38b",
      "title": "To Kill a Mockingbird",
      "author": "Harper Lee",
      "genre": "Fiction",
      "publishedYear": 1960,
      "__v": 0
    }
  ]
}
```

**Response Body (500 Error):**  
```json
{
  "error": "Error message from server"
}
```

**Example Request (cURL):**  
```bash
curl -X GET \
  http://localhost:3000/books \
  -H 'Content-Type: application/json'
```

---

## 3. Update Book Details

**Endpoint:** `PUT /books/:id` (Replace `:id` with the actual book ID)  
**Description:** Updates the details of an existing book.  
**Request Method:** PUT  
**Request Headers:**  
- `Content-Type: application/json`  

**Request Parameters:**  
- `id` (Path Parameter): The ID of the book to update.  
  - **Type:** String  
  - **Required:** Yes  

**Request Body:**  
```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "genre": "Fiction",
  "publishedYear": 1926
}
```

**Notes:**  
- `title` and `author` are required fields. Omitting them will result in an error.

**Response Codes:**  
- `200 OK`: The book was successfully updated.  
- `404 Not Found`: Book with the specified ID was not found.  
- `500 Internal Server Error`: An error occurred on the server.  

**Response Body (200 OK):**  
```json
{
  "success": true,
  "message": "Added New Book successfully",
  "data": {
    "_id": "60c14c9b9b5f930017e0d38a",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "genre": "Fiction",
    "publishedYear": 1926,
    "__v": 0
  }
}
```


**Example Request (cURL):**  
```bash
curl -X PUT \
  http://localhost:3000/books/60c14c9b9b5f930017e0d38a \
  -H 'Content-Type: application/json' \
  -d '{
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "genre": "Fiction",
    "publishedYear": 1926
  }'
```

---

## 4. Delete a Book

**Endpoint:** `DELETE /books/:id` (Replace `:id` with the actual book ID)  
**Description:** Deletes a book from the library.  
**Request Method:** DELETE  
**Request Headers:**  
- `Content-Type: application/json`  

**Request Parameters:**  
- `id` (Path Parameter): The ID of the book to delete.  
  - **Type:** String  
  - **Required:** Yes  

**Request Body:**  
None  

**Response Codes:**  
- `200 OK`: The book was successfully deleted.  
- `404 Not Found`: Book with the specified ID was not found.  
- `500 Internal Server Error`: An error occurred on the server.  

**Response Body (200 OK):**  
```json
{
  "success": true,
  "message": "Added New Book successfully",
  "data": {
    "_id": "60c14c9b9b5f930017e0d38a",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "genre": "Fiction",
    "publishedYear": 1925,
    "__v": 0
  }
}
```

**Example Request (cURL):**  
```bash
curl -X DELETE \
  http://localhost:3000/books/60c14c9b9b5f930017e0d38a \
  -H 'Content-Type: application/json'
```
