# WealthTracker - Replit Deployment Guide

## 🚀 Quick Deploy to Replit

### Option 1: Import from GitHub

1. Go to [Replit](https://replit.com)
2. Click "Create Repl"
3. Select "Import from GitHub"
4. Paste your repository URL
5. Click "Import from GitHub"
6. Replit will automatically detect the configuration and start the app

### Option 2: Manual Setup

1. Create a new Repl on Replit
2. Select "Node.js" as the template
3. Upload your project files or clone from GitHub
4. The `.replit` and `replit.nix` files are already configured
5. Click "Run" to start the development server

## 📋 Configuration Files

The following files have been created for Replit deployment:

- **`.replit`** - Main Replit configuration
  - Runs development server on port 3000
  - Configures deployment settings
  - Sets environment variables

- **`replit.nix`** - Nix package dependencies
  - Node.js 20.x
  - TypeScript support
  - Development tools

- **`.replitignore`** - Files to ignore in Replit
  - Build artifacts
  - Dependencies
  - Git files

## 🔧 Environment Variables

No additional environment variables are required for the sample data version.

If you integrate with external APIs later, add them in Replit:
1. Click on "Tools" in the left sidebar
2. Select "Secrets"
3. Add your environment variables

## 🌐 Accessing Your App

Once deployed:
- **Development**: The app will be available at your Replit preview URL
- **Production**: Use Replit's deployment feature for a production build

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run linter

## 📱 Features

Your WealthTracker app includes:
- ✅ Net worth tracking
- ✅ Account management (checking, savings, credit, investment)
- ✅ Transaction history
- ✅ Cash flow visualization
- ✅ Spending by category
- ✅ Interactive charts and graphs

## 🎨 Customization

To use your own financial data:
1. Update `/src/lib/sample-data.ts` with your accounts and transactions
2. Or create a data import feature to load from CSV/spreadsheet

## 📞 Support

For issues or questions:
- Check Next.js documentation: https://nextjs.org/docs
- Check Replit documentation: https://docs.replit.com
- Review the project README

---

**Note**: The app uses Next.js 15.2.3 with Turbopack for fast development builds.
