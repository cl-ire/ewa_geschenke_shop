#!/bin/bash

# Define variables for database connection
DB_USER="root"
SQL_FILE_PATH="./init_products_table.sql"  # Path to your SQL script file
SQL_FILE_PATH2="./init_user_table.sql"  # Path to your SQL script file

# Check if the SQL file exists
if [ ! -f "$SQL_FILE_PATH" ]; then
    echo "SQL file not found at $SQL_FILE_PATH"
    exit 1
fi

if [ ! -f "$SQL_FILE_PATH2" ]; then
    echo "SQL file not found at $SQL_FILE_PATH2"
    exit 1
fi

# Execute the SQL script using the mysql command
mysql -u "$DB_USER" < "$SQL_FILE_PATH"

echo
echo

mysql -u "$DB_USER" < "$SQL_FILE_PATH2"

# Check if the command was successful
if [ $? -eq 0 ]; then
    echo "SQL script executed successfully."
else
    echo "An error occurred while executing the SQL script."
fi
