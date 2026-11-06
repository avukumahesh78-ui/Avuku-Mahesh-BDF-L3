
require("dotenv").config();

const express = require("express");
const db = require("./database");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Database helper functions
function all(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

function get(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
}

function run(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve({
                id: this.lastID,
                changes: this.changes
            });
        });
    });
}

// Validate book details
function validateBook(body) {
    if (!body || !body.title ||
        typeof body.title !== "string" ||
        !body.title.trim()) {
        return "Title is required";
    }

    if (!body.author ||
        typeof body.author !== "string" ||
        !body.author.trim()) {
        return "Author is required";
    }

    if (body.price === undefined ||
        body.price === null ||
        body.price === "" ||
        !Number.isFinite(Number(body.price))) {
        return "Price must be a valid number";
    }

    return null;
}

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "Books REST API is running"
    });
});

// GET all books: search, sorting, pagination and price filter
app.get("/books", async (req, res) => {
    try {
        const {
            search_q = "",
            order_by = "id",
            order = "ASC",
            limit = "10",
            offset = "0",
            min_price,
            max_price
        } = req.query;

        const allowedColumns = ["id", "title", "author", "price"];

        const sortColumn = allowedColumns.includes(order_by)
            ? order_by : "id";

        const sortOrder =
            String(order).toUpperCase() === "DESC" ? "DESC" : "ASC";

        const pageLimit = Math.min(
            Math.max(parseInt(limit, 10) || 10, 1), 100
        );

        const pageOffset = Math.max(
            parseInt(offset, 10) || 0, 0
        );

        const conditions = [];
        const params = [];

        if (search_q.trim()) {
            conditions.push("title LIKE ?");
            params.push(`%${search_q.trim()}%`);
        }

        if (min_price !== undefined) {
            if (!Number.isFinite(Number(min_price))) {
                return res.status(400).json({
                    message: "min_price must be numeric"
                });
            }
            conditions.push("price >= ?");
            params.push(Number(min_price));
        }

        if (max_price !== undefined) {
            if (!Number.isFinite(Number(max_price))) {
                return res.status(400).json({
                    message: "max_price must be numeric"
                });
            }
            conditions.push("price <= ?");
            params.push(Number(max_price));
        }

        if (min_price !== undefined && max_price !== undefined &&
            Number(min_price) > Number(max_price)) {
            return res.status(400).json({
                message: "min_price cannot exceed max_price"
            });
        }

        const where = conditions.length
            ? "WHERE " + conditions.join(" AND ")
            : "";

        const sql = `
            SELECT * FROM books
            ${where}
            ORDER BY ${sortColumn} ${sortOrder}
            LIMIT ? OFFSET ?
        `;

        params.push(pageLimit, pageOffset);

        const books = await all(sql, params);

        res.status(200).json({
            message: "Books retrieved successfully",
            count: books.length,
            data: books
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to retrieve books"
        });
    }
});

// GET book by ID
app.get("/books/:id", async (req, res) => {
    try {
        const book = await get(
            "SELECT * FROM books WHERE id = ?",
            [req.params.id]
        );

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json({
            message: "Book retrieved successfully",
            data: book
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to retrieve book"
        });
    }
});

// POST create a book
app.post("/books", async (req, res) => {
    const errorMessage = validateBook(req.body);

    if (errorMessage) {
        return res.status(400).json({
            message: errorMessage
        });
    }

    try {
        const { title, author, price } = req.body;

        const result = await run(
            "INSERT INTO books (title, author, price) VALUES (?, ?, ?)",
            [title.trim(), author.trim(), Number(price)]
        );

        res.status(201).json({
            message: "Book created successfully",
            id: result.id
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to create book"
        });
    }
});

// PUT update a book
app.put("/books/:id", async (req, res) => {
    const errorMessage = validateBook(req.body);

    if (errorMessage) {
        return res.status(400).json({
            message: errorMessage
        });
    }

    try {
        const { title, author, price } = req.body;

        const result = await run(
            `UPDATE books
             SET title = ?, author = ?, price = ?
             WHERE id = ?`,
            [title.trim(), author.trim(), Number(price), req.params.id]
        );

        if (result.changes === 0) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json({
            message: "Book updated successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to update book"
        });
    }
});

// DELETE a book
app.delete("/books/:id", async (req, res) => {
    try {
        const result = await run(
            "DELETE FROM books WHERE id = ?",
            [req.params.id]
        );

        if (result.changes === 0) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json({
            message: "Book deleted successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to delete book"
        });
    }
});

// Start server
// Start server


app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});

