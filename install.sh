#!/bin/bash

# Provide basic information
echo "Installing Node.js and dependencies..."

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "Node.js not found. Please install Node.js first."
    exit 1
fi

# Install node-fetch
npm install node-fetch

# Prompt the user to enter the Bearer token
read -p "Enter Bearer token: " TOKEN

# Run the getPoints.js script with the token as an argument
echo "Running the script..."
node getPoints.js $TOKEN
