### 1. **MongoDB Connection with Mongoose**
```javascript
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/DB_CONNECTION")
    .then(() => console.log("DB connected successfully"))
    .catch((err) => console.log("failed to connect DB"));
```
- Established connection to local MongoDB instance
- Used connection string format: `mongodb://host:port/database_name`
- Implemented connection success/error handling with Promises

### 2. **Schema Definition and Models**
```javascript
const userScheema = new mongoose.Schema({
    last_name:  { type: String },
    first_name: { type: String, required: true },
    gender:     { type: String, required: true },
    job_title:  { type: String, required: true },
    email:      { type: String, required: true, unique: true },
    id:         { type: Number, required: true, unique: true },
});

const users = mongoose.model("users", userScheema);
```
- **Schema**: Defines the structure and validation rules for documents
- **Model**: Interface for interacting with the database collection
- **Field Properties**: `required`, `unique`, `type` constraints
- **Data Types**: String, Number, Boolean, Date, etc.

### 3. **Key Differences: Arrays vs MongoDB**

| Array Methods (Previous Project) | MongoDB/Mongoose Methods |
|----------------------------------|--------------------------|
| `users.find(user => user.id === id)` | `await users.findOne({id: userId})` |
| `users.push(newUser)` | `await users.create(newUser)` |
| `users.splice(index, 1)` | `await users.deleteOne({id: userId})` |
| Direct object modification | `await users.updateOne({query}, {$set: data})` |
| Synchronous operations | **Asynchronous** operations (need `await`) |
| In-memory storage | **Persistent** database storage |

### 4. **CRUD Operations with MongoDB**

#### **CREATE (POST)**
```javascript
const user = await users.create({
    id: userId,
    first_name: newUserData.first_name,
    // ... other fields
});
```
- `users.create()` - Creates new document in database
- Returns the created document
- Automatically validates against schema

#### **READ (GET)**
```javascript
// Get one user
const userObject = await users.findOne({id: userId});

// Get all users (should be implemented)
const allUsers = await users.find({});
```
- `findOne({query})` - Returns single document or null
- `find({})` - Returns array of all documents
- Query by any field: `{email: "test@example.com"}`

#### **UPDATE (PATCH)**
```javascript
await users.updateOne(
    {id: userId},        // WHERE condition
    {$set: updatedData}  // WHAT to update
);

// Better alternative:
const updatedUser = await users.findOneAndUpdate(
    {id: userId}, 
    {$set: updatedData}, 
    {new: true}  // Return updated document
);
```
- `$set` operator - Updates only specified fields
- `findOneAndUpdate()` - Updates and returns updated document
- `{new: true}` - Returns updated version instead of original

#### **DELETE (DELETE)**
```javascript
await users.deleteOne({id: userId});

// Alternative:
const deletedUser = await users.findOneAndDelete({id: userId});
```
- `deleteOne({query})` - Removes first matching document
- `findOneAndDelete()` - Removes and returns the deleted document

### 5. **MongoDB Query Operators**
- `$set` - Update specific fields
- `$unset` - Remove fields
- `$inc` - Increment numeric values
- `$push` - Add to arrays
- `$pull` - Remove from arrays