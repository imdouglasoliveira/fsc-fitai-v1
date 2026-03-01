# Dev Container for Bootcamp SGT - Claude Code Integration
# Based on Node.js official image with additions for development

FROM mcr.microsoft.com/devcontainers/javascript-node:18-bullseye

# Install additional tools
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    git \
    vim \
    nano \
    build-essential \
    python3 \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Install pnpm (package manager)
RUN npm install -g pnpm@10.30.3

# Install zsh and Oh My Zsh (optional but recommended)
RUN apt-get update && apt-get install -y --no-install-recommends zsh \
    && rm -rf /var/lib/apt/lists/*

RUN sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended || true

# Set Node.js memory limit
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Create workspace directory
WORKDIR /workspace

# Set default shell to bash (zsh available as alternative)
SHELL ["/bin/bash", "-c"]

# Switch to node user for security
USER node

# Show Node.js and pnpm versions
RUN node --version && npm --version && pnpm --version

# Health check (optional - verify Node is working)
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD node -v && pnpm -v || exit 1

# Set PS1 for better terminal experience
RUN echo 'export PS1="🚀 sgt-dev $ "' >> ~/.bashrc
