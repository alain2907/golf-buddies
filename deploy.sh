#!/bin/bash

echo "⛳ Golf Buddies Deployment Script"
echo "================================="

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Error: Node.js 18+ required. Current version: $(node -v)${NC}"
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found${NC}"
    exit 1
fi

# Check project name
PROJECT_NAME=$(node -p "require('./package.json').name")
if [ "$PROJECT_NAME" != "golf-buddies" ]; then
    echo -e "${RED}❌ Error: Wrong project. Expected 'golf-buddies', got '$PROJECT_NAME'${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Project verified: $PROJECT_NAME${NC}"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Installing dependencies...${NC}"
    npm install
fi

# Check environment variables
if [ ! -f ".env.local" ]; then
    echo -e "${RED}❌ Error: .env.local not found${NC}"
    echo "Please copy .env.local.example to .env.local and add your Firebase credentials"
    exit 1
fi

# Run linting
echo -e "${YELLOW}🔍 Running linter...${NC}"
npm run lint

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Linting failed. Please fix errors before deploying${NC}"
    exit 1
fi

# Run build
echo -e "${YELLOW}🔨 Building project...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed. Please fix errors before deploying${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build successful!${NC}"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}Installing Vercel CLI...${NC}"
    npm i -g vercel
fi

# Deploy to Vercel
echo -e "${YELLOW}🚀 Deploying to Vercel...${NC}"
echo "Choose your deployment option:"
echo "1) Production deployment"
echo "2) Preview deployment"
read -p "Enter choice (1 or 2): " choice

case $choice in
    1)
        vercel --prod
        ;;
    2)
        vercel
        ;;
    *)
        echo -e "${RED}Invalid choice${NC}"
        exit 1
        ;;
esac

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Deployment successful!${NC}"
    echo -e "${GREEN}🎉 Golf Buddies is now live!${NC}"
else
    echo -e "${RED}❌ Deployment failed${NC}"
    exit 1
fi