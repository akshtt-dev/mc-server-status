# MC Server Status Website

This repository contains a Minecraft Server Status website built using Express, Express-Handlebars, and MongoDB.

## Getting Started

### Prerequisites

Make sure you have the following installed on your system:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/akshtt-dev/mc-server-status
   cd mc-server-status
   ```

2. **Set up environment variables:**

- Copy the `example.env` file to `.env`:

  ```bash
  cp example.env .env
  ```
  
- Edit the `.env` file with your preferred settings.

3. **Install Node modules:**
  ```bash
  npm install
  ```

### Running the Application

You can run the application using one of the following commands:

- **Production mode:**

  ```bash
  npm start
  ```
  
  or
  
  ```bash
  node .
  ```
  
- **Development mode (with hot-reloading):**
  
  ```bash
  npm run dev
  ```

### Usage

After running the application, open your browser and navigate to http://localhost:3000 to see the Minecraft Server Status website in action.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the open-source community for providing the tools and libraries used in this project.
