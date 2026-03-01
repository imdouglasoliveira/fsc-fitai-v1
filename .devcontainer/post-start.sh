#!/bin/bash
# Post-start hook - runs every time container restarts

set -e

echo "🔄 Starting Bootcamp SGT dev environment..."

# Verify environment files exist
if [ ! -f "backend/.env" ] || [ ! -f "frontend/.env.local" ]; then
  echo "⚠️  Environment files missing - running post-create initialization..."
  bash .devcontainer/post-create.sh
  exit $?
fi

# Check for node_modules
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  pnpm install
fi

# Show status
echo ""
echo "✅ Dev environment ready!"
echo ""
echo "Next steps:"
echo "  pnpm run dev     - Start development servers"
echo "  pnpm run test    - Run tests"
echo ""
