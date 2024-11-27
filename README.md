<p align="center" style="margin-top: 20px">
  <h1 align="center">Scramblify</h1>
  <p align="center">
    <a href="https://www.npmjs.com/package/scramblify">
      <img src="https://raw.githubusercontent.com/0xsarwagya/scramblify/main/.github/assets/icon.png" alt="Scramblify Logo" height="120" width="120">
    </a>
  </p>
  <p align="center">
    <i>An open-source TypeScript CLI that securely encrypts and decrypts PNG, JPG, and JPEG images into gibberish. Protect your images with a unique key that you control.</i>
    <br />
    <a href="https://0xsarwagya.github.io/scramblify"><strong>Explore the documentation »</strong></a>
    <br />
    <br />
    <a href="https://www.npmjs.com/package/scramblify"><img src="https://img.shields.io/npm/v/scramblify.svg" alt="NPM Version"></a>
    <a href="https://github.com/0xsarwagya/scramblify/issues"><img src="https://img.shields.io/github/issues/0xsarwagya/scramblify.svg" alt="Issues"></a>
    <a href="https://github.com/0xsarwagya/scramblify/stargazers"><img src="https://img.shields.io/github/stars/0xsarwagya/scramblify.svg" alt="Stars"></a>
    <a href="https://github.com/0xsarwagya/scramblify/blob/main/LICENSE"><img src="https://img.shields.io/github/license/0xsarwagya/scramblify.svg" alt="License"></a>
  </p>
</p>

---

## 🚀 Features

- **Secure Encryption**: Converts your images into unreadable gibberish while maintaining their format (PNG, JPG, JPEG).
- **Key-Based Unlocking**: Generate a unique key during encryption that’s required for decryption.
- **User-Friendly CLI**: Easy-to-use command-line interface built with TypeScript.
- **Customizable Output**: Supports input and output file paths for flexible usage.
- **Open-Source**: Free to use, modify, and contribute to.

---

## 📦 Installation

To install Scramblify, make sure you have [Node.js](https://nodejs.org/) installed on your system.

```bash
npm install -g scramblify
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

## 📖 Documentation

For full usage instructions and advanced configurations, visit the [official documentation](https://0xsarwagya.github.io/scramblify).

---

## 🤝 Contributing

We welcome contributions from the community! To get started, check out our [contributing guidelines](https://github.com/0xsarwagya/scramblify/blob/main/CONTRIBUTING.md).

### Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/0xsarwagya/scramblify.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the CLI locally:
   ```bash
   npm run build && npx .
   ```

---

## 🎉 Top Contributors

A big thank you to everyone who has contributed to this project!

<a href="https://github.com/0xsarwagya/scramblify/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=0xsarwagya/scramblify" />
</a>

Made with [Contrib.rocks](https://contrib.rocks).

---

## 🛡 License

This project is licensed under the [MIT License](https://github.com/0xsarwagya/scramblify/blob/main/LICENSE). 

---

## 💬 Support

If you have any questions, feel free to [open an issue](https://github.com/0xsarwagya/scramblify/issues) or reach out to the maintainers.

---

## 📢 Stay Connected

- **Website**: [Scramblify Documentation](https://0xsarwagya.github.io/scramblify)  
- **NPM Package**: [Scramblify on NPM](https://www.npmjs.com/package/scramblify)  
- **Twitter**: [@0xsarwagya](https://twitter.com/0xsarwagya)