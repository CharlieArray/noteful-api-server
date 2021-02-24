module.exports = {
    port: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DB_URL: process.env.DB_URL || process.env.DATABASE_URL || "postgresql://postgres@localhost/noteful"
}