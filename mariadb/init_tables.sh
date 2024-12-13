#!/bin/bash

# Define variables for database connection
DB_USER="root"
SQL_DIR="./setup"

# Loop through all SQL files in the setup directory and execute each one
for SQL_FILE in "$SQL_DIR"/*.sql; do
    # Check if the SQL file exists
    if [ ! -f "$SQL_FILE" ]; then
        echo "SQL file not found at $SQL_FILE"
        exit 1
    fi

    # Execute the SQL script using the mysql command
    mysql -u "$DB_USER" < "$SQL_FILE"

    # Check if the command was successful
    if [ $? -eq 0 ]; then
        echo "SQL script $SQL_FILE executed successfully."
    else
        echo "An error occurred while executing the SQL script $SQL_FILE."
        exit 1
    fi

    echo
done