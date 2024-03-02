# CoShop

## Project Overview

Making shopping simpler by effortlessly collaborating with friends and family, making list
sharing a breeze. Stay organized, save time, and simplify your shopping routine, all in one web app!

Learn more about the CoShoppers teams [here](./TEAM.md).

Read about our development process [here](./PROCESS.md).

Read about our CI/CD philosophy [here](./CICD.md).

Read about our MVP proposal [here](./MVP.md).

## Table of Contents

1. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
2. [Usage](#usage)
   - [Configuration](#configuration)
   - [Running the Application](#running-the-application)
3. [Contributing](#contributing)
   - [Code Formatting](#code-formatting)
   - [Branching Strategy](#branching-strategy)
   - [Workflow Example](#workflow-example)
4. [License](#license)
5. [Contact](#contact)

## Getting Started

### Prerequisites

Before setting up the project, ensure that you have the following prerequisites installed on your system:

- [Node.js](https://nodejs.org/): Make sure you have Node.js installed.
- [npm](https://www.npmjs.com/): npm is the package manager for JavaScript. You can install it by installing Node.js.

### Installation

[Step 1: Clone the repository]

```bash
git clone https://github.com/your-username/coshop-web.git
```

[Step 2: Install dependencies]

```bash
cd coshop
npm install # (or i for short)
```

## Usage

### Configuration

Before running the website, you'll need to perform the following configuration steps:

1. Create a `.env` file in the root of the project.

2. Paste the received variables into the `.env` file.

#### Running the Application

```bash
# Start the local development server
npm run dev
```

### Contributing

#### Code Formatting

We use a pre-commit hook to handle code formatting using Husky. This ensures consistent and clean code. Before making a commit, the pre-commit hook will run automatically.

#### Branching Strategy

**Main Branch:** The `main` branch is considered stable and reflects the latest production-ready code. We encourage contributors to only make pull requests targeting the `main` branch when their changes have been thoroughly tested and are ready for production.

**Development Branch (`dev`):** For day-to-day development work, feature additions, and bug fixes, we use a dedicated `dev` branch. Contributors should create feature branches from `dev` to work on specific enhancements or bug fixes.

#### Workflow Example

1. Create a new branch for your feature or bug fix:

   ```bash
   git checkout -b feature/your-feature dev
   ```

2. Make your changes, commit them, and push your branch:

   ```bash
   git add .
   git commit -m "Description of your changes"
   git push origin feature/your-feature
   ```

3. Afer review, create a pull request from your feature branch to the `dev` branch.
4. Once the changes are reviewed and approved, they can be merged into `dev`.
5. After final review and approval, changes are merged into the `main` branch for production releases.

By following this workflow, we ensure that we maintain a stable main branch while keeping a controlled development environment on the dev branch.

### License

This project is proprietary to CoShop and not licensed. All rights reserved.

### Contact

For internal inquiries and collaboration within the team, please contact:

- Julian: [julian@shopwithcoshop.com](mailto:julian@shopwithcoshop.com)
- Amna: [amna@shopwithcoshop.com](mailto:amna@shopwithcoshop.com)
