#!/bin/bash
# Post-create hook for dev container initialization

set -e

echo "🚀 Initializing Bootcamp SGT development environment..."

# Node.js setup
echo "📦 Setting up Node.js dependencies..."
pnpm install

# Create .env files if they don't exist
echo "⚙️  Setting up environment files..."

if [ ! -f "backend/.env" ]; then
  cat > backend/.env << 'EOF'
DATABASE_URL="postgresql://bootcamp:bootcamp@localhost:5432/sgt_dev"
JWT_SECRET="dev-secret-key-change-in-production"
PORT=3001
NODE_ENV="development"
LOG_LEVEL="debug"
EOF
  echo "✓ Created backend/.env (development defaults)"
fi

if [ ! -f "frontend/.env.local" ]; then
  cat > frontend/.env.local << 'EOF'
NEXT_PUBLIC_API_URL=http://localhost:3001
NODE_ENV=development
EOF
  echo "✓ Created frontend/.env.local"
fi

# Git hooks setup (if Husky is installed)
if [ -f "package.json" ] && grep -q "husky" package.json; then
  echo "🪝 Setting up Git hooks..."
  pnpm exec husky install || true
fi

# TypeScript check
echo "🔍 Running TypeScript checks..."
pnpm run type-check || true

# Build information
echo ""
echo "✅ Dev container initialization complete!"
echo ""
echo "📚 Available commands:"
echo "   pnpm run dev        - Start both backend and frontend"
echo "   pnpm run lint       - Run ESLint"
echo "   pnpm run test       - Run tests"
echo ""
echo "🔗 Ports:"
echo "   Frontend:  http://localhost:3000"
echo "   Backend:   http://localhost:3001"
echo ""
echo "📖 For more info, see CLAUDE.md"
echo ""
