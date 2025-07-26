# 🔐 Password Entropy Analyzer

A beautiful, real-time password strength analyzer built with Vue 3 and TypeScript. This tool provides comprehensive security analysis including entropy calculations, crack time estimates, and visual feedback to help users create stronger passwords.

## 🌐 Live Demo

**[Try it live at buddhhu.github.io/Log2YouLose](https://buddhhu.github.io/Log2YouLose)**

Experience the Password Entropy Analyzer in action! Test your passwords and see real-time security analysis with our interactive demo.

## ✨ Features

- **Real-time Analysis** - Instant feedback as you type
- **Entropy Calculation** - Precise mathematical entropy measurement in bits
- **Security Requirements** - Visual checklist of password requirements
- **Crack Time Estimation** - Realistic time estimates for password cracking
- **Modern Dark UI** - Sleek, responsive design with glassmorphism effects
- **TypeScript Support** - Full type safety and better developer experience
- **Vue 3 Composition API** - Modern, reactive Vue.js architecture

## 🎯 Key Metrics

The analyzer evaluates passwords based on:

- **Character Diversity**: Lowercase, uppercase, numbers, and special characters
- **Length Requirements**: 8+ and 12+ character thresholds
- **Entropy Calculation**: Mathematical randomness measurement
- **Strength Classification**: Weak (<40 bits), Moderate (40-60 bits), Strong (60+ bits)
- **Crack Time Estimates**: Based on 10 billion guesses per second

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- Vue 3 project setup

### Installation

1. Clone the repository:

```bash
git clone https://github.com/buddhhu/Log2YouLose.git
cd Log2YouLose
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open your browser to `http://localhost:5173`

## 🧮 How It Works

### Entropy Calculation

The entropy is calculated using the formula:

```
Entropy = log₂(charset_size^password_length)
```

Where `charset_size` is determined by:

- Lowercase letters: +26 characters
- Uppercase letters: +26 characters
- Numbers: +10 characters
- Special characters: +32 characters

### Security Requirements

The analyzer checks for:

1. **Lowercase Letters (a-z)** - Basic character set
2. **Uppercase Letters (A-Z)** - Case variation
3. **Numbers (0-9)** - Numeric characters
4. **Special Characters (!@#$...)** - Symbols and punctuation
5. **Minimum 8 Characters** - Industry standard minimum
6. **Minimum 12 Characters** - Enhanced security threshold

### Strength Classification

- **Weak** (< 40 bits): Easily crackable
- **Moderate** (40-60 bits): Reasonable for basic security
- **Strong** (60+ bits): Highly secure

## 🎨 Customization

### Security Parameters

Modify the entropy calculation in `usePasswordEntropy.ts`:

```typescript
// Adjust crack time calculation
const guessesPerSecond = 1e10; // 10 billion guesses/second

// Customize strength thresholds
if (bits < 40) return "Weak";
if (bits < 60) return "Moderate";
return "Strong";
```

## 🛠️ Built With

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool

## 📊 Security Considerations

This tool is designed for educational and guidance purposes. Remember:

- Entropy calculations are theoretical maximums
- Real-world attacks may vary in sophistication
- Consider using a password manager for optimal security
- Enable two-factor authentication when possible

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Password security best practices from NIST guidelines
- Entropy calculation methods from cryptographic standards
- UI inspiration from modern security tools

**⚡ Built with security and user experience in mind**
