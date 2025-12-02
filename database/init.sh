#!/bin/bash

# Database initialization script
# This script creates the database and runs the schema

echo "Initializing BrainyWrite database..."

# Set database connection variables
export PGHOST=${PGHOST:-localhost}
export PGPORT=${PGPORT:-5432}
export PGUSER=${PGUSER:-postgres}
export PGDATABASE=${PGDATABASE:-brainywrite_db}

# Create database if it doesn't exist
echo "Creating database if it doesn't exist..."
psql -h $PGHOST -p $PGPORT -U $PGUSER -d postgres -c "CREATE DATABASE $PGDATABASE;" 2>/dev/null || echo "Database already exists or error occurred"

# Run schema (using schema.sql - the official schema)
echo "Running schema..."
psql -h $PGHOST -p $PGPORT -U $PGUSER -d $PGDATABASE -f database/schema.sql

echo "Database initialization complete!"

