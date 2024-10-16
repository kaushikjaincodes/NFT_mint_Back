# NFT Minting and Image Upload API

This project provides two main API functionalities:
1. **Minting NFTs** using the Crossmint API.
2. **Uploading images** to Cloudinary and retrieving the image URL.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [Mint NFT](#mint-nft)
  - [Upload Image](#upload-image)
- [Usage](#usage)

---

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14.x or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- Cloudinary Account (for image storage)
- Crossmint API Account (for minting NFTs)

---

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/kaushikjaincodes/NFT_mint_Back.git
   cd NFT_mint_Back
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create `.env` file**:
   - Duplicate the `.env.example` file and rename it as `.env`.
   - Add your environment variables as outlined in the [Environment Variables](#environment-variables) section.

---

## Environment Variables

Ensure to configure the following variables in your `.env` file:

```plaintext
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY_IMG=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
API_KEY_MINT=your_crossmint_api_key
CHAIN=solana # or the blockchain you are using
ENV=staging # or production depending on your Crossmint environment
```

---

## API Endpoints

### 1. Mint NFT

**Endpoint:** `POST /api/v1/mint/NFT`

**Description:** This endpoint mints an NFT using the Crossmint API.

**Request Body:**
```json
{
  "recipientEmail": "recipient@example.com",
  "imageUrl": "https://image-url-from-cloudinary.com"
}
```

**Response:**
- Success: 
  ```json
  {
    "success": true,
    "message": "NFT successfully minted",
    "data": { ... }
  }
  ```
- Failure: 
  ```json
  {
    "success": false,
    "message": "Failed to mint NFT",
    "error": "Error message"
  }
  ```

### 2. Upload Image

**Endpoint:** `POST /api/v1/image/geturl`

**Description:** Uploads a base64 image to Cloudinary and returns the secure URL.

**Request Body:**
```json
{
  "base64Data": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
}
```

**Response:**
- Success: 
  ```json
  {
    "imageUrl": "https://res.cloudinary.com/.../image-url.jpg"
  }
  ```
- Failure: 
  ```json
  {
    "error": "Error uploading image"
  }
  ```

---

## Usage

1. **Start the server**:
   ```bash
   npm start
   ```

2. The server will start on `http://localhost:3000`. You can now test the API using a tool like [Postman](https://www.postman.com/) or [cURL](https://curl.se/).

---