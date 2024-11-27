# Scramblify Documentation

Welcome to the official documentation for **Scramblify**! This guide covers everything you need to know about using, configuring, and contributing to Scramblify, the CLI tool for encrypting and decrypting images with ease.

---

## 🏗 What is Scramblify?

Scramblify is a TypeScript-based open-source CLI that:
- **Encrypts images** into gibberish files while preserving the format (PNG, JPG, JPEG).
- **Decrypts the gibberish files** back to the original image using a password/key.
- Gives you **complete control** over your sensitive images with key-based security.

---

## 📚 Table of Contents

1. [Getting Started](#-getting-started)
   - [Installation](#installation)
   - [CLI Overview](#cli-overview)
2. [Usage](#-usage)
   - [Encrypting Images](#encrypting-images)
   - [Decrypting Images](#decrypting-images)
   - [Environment Variables](#environment-variables)
3. [How It Works](#-how-it-works)
4. [FAQs](#-faqs)
5. [Contributing](#-contributing)
6. [License](#-license)

---

## 🚀 Getting Started

### Installation

Ensure you have [Node.js](https://nodejs.org/) installed. Then, install Scramblify globally via npm:

```bash
npm install -g scramblify
```

### CLI Overview

The CLI provides two main commands:

1. **`encrypt`**: Converts an image into a scrambled (gibberish) file.
2. **`decrypt`**: Restores the scrambled file back to its original format.

To view available commands and options, use:

```bash
scramblify --help
```

---

## 🛠 Usage

### Encrypt an Image

To encrypt an image and generate a scrambled file:

```bash
scramblify encrypt scramblify encrypt --input <input_file_path> --output <output_file_path> --password <password>
```

Example:

```bash
scramblify encrypt --input <input_file_path> --output <output_file_path> --password <password>
```

### Decrypt an Image

To decrypt a scrambled file back to its original format:

```bash
scramblify decrypt --input <input_file_path> --output <output_file_path> --password <password>
```

Example:

```bash
scramblify decrypt  --input <input_file_path> --output <output_file_path> --password <password>
```

---
### Environment Variables

For enhanced security, you can set the password using an environment variable:

```bash
export SCRAMBLIFY_PASSWORD="your-secure-password"
```

The CLI will automatically use this password for encryption and decryption. If no password is set, you’ll be prompted to enter one.

---

## 🧠 How It Works

Scramblify uses **AES-256-CBC encryption** to secure your images. Here’s the process:

1. **Encryption**:
   - A unique 256-bit key is derived from your password.
   - The image data is encrypted using this key and a random initialization vector (IV).
   - The IV is prepended to the scrambled output file for use during decryption.

2. **Decryption**:
   - The IV is extracted from the scrambled file.
   - The same password/key is used to reverse the encryption and restore the original image.

---

## ❓ FAQs

### 1. Which image formats are supported?
Scramblify currently supports PNG, JPG, and JPEG formats.

### 2. What happens if I forget my password?
If you lose the password used for encryption, **decryption is impossible** due to the secure nature of AES encryption. Always store your password securely.

### 3. Does Scramblify compress images during encryption?
No, Scramblify only encrypts the image data. The file size may slightly increase due to the addition of the IV.

### 4. Is it safe to share the scrambled file?
Yes, as long as the password/key is kept secret. Without the password, the scrambled file cannot be decrypted.

---

## 🤝 Contributing

We welcome community contributions to make Scramblify even better! If you're interested:

1. Check out the [Contributing Guidelines](https://github.com/0xsarwagya/scramblify/blob/main/CONTRIBUTING.md).
2. Fork the repository and submit a pull request.
3. Join discussions in the [issues](https://github.com/0xsarwagya/scramblify/issues) section.

---

## 🛡 License

Scramblify is licensed under the [MIT License](https://github.com/0xsarwagya/scramblify/blob/main/LICENSE). Feel free to use, modify, and distribute the project.