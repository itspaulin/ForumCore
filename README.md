# ForumCore

A forum management system built with NestJS following Clean Architecture and Domain-Driven Design (DDD) principles. This application provides a comprehensive solution for managing questions, answers, comments, and user interactions in a forum environment.

## 🎯 About the Project

**NestJS Clean Architecture** is a robust and scalable backend application that demonstrates the implementation of Clean Architecture principles with NestJS. The system manages a complete forum ecosystem including student authentication, question creation, answer management, comments, and file attachments.

## 🛠️ Technologies Used

- **Framework:** [NestJS](https://nestjs.com/) - A progressive Node.js framework
- **Language:** TypeScript
- **Runtime:** Node.js
- **Architecture:** Clean Architecture + Domain-Driven Design (DDD)
- **Testing:** Unit and Integration testing
- **Authentication:** JWT-based authentication
- **Storage:** File storage system
- **Cache:** Caching layer implementation
- **Events:** Domain events system

## 📋 Prerequisites

Before getting started, make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

## 🚀 Installation and Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/itspaulin/nest-clean-architecture.git
   cd nest-clean-architecture
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit the .env file with your configurations
   ```

4. **Start the application**
   ```bash
   npm run start:dev
   ```

## 📁 Project Structure

This project follows **Clean Architecture** and **Domain-Driven Design (DDD)** principles:

```
nest-clean-architecture/
├── src/
│   ├── core/                      # Core layer
│   │   ├── @types/                # Type definitions
│   │   ├── entities/              # Base entities
│   │   │   ├── aggregate-root.ts
│   │   │   ├── entity.ts
│   │   │   ├── unique-entity-id.ts
│   │   │   ├── value-object.ts
│   │   │   ├── watched-list.test.ts
│   │   │   └── watched-list.ts
│   │   ├── errors/                # Core errors
│   │   ├── events/                # Domain events
│   │   ├── repositories/          # Repository contracts
│   │   ├── either.test.ts         # Either monad tests
│   │   └── either.ts              # Either monad implementation
│   ├── domain/
│   │   ├── forum/                 # Forum domain
│   │   │   ├── application/       # Application layer
│   │   │   │   ├── cryptography/  # Cryptography services
│   │   │   │   │   ├── encrypter.ts
│   │   │   │   │   ├── hash-comparer.ts
│   │   │   │   │   └── hash-generator.ts
│   │   │   │   ├── repositories/  # Repository contracts
│   │   │   │   │   ├── answer-attachment-repository.ts
│   │   │   │   │   ├── answers-comments-repository.ts
│   │   │   │   │   ├── answers-repository.ts
│   │   │   │   │   ├── attachments-repository.ts
│   │   │   │   │   ├── question-attachments-repository.ts
│   │   │   │   │   ├── question-comments-repository.ts
│   │   │   │   │   ├── questions-repository.ts
│   │   │   │   │   └── students-repository.ts
│   │   │   │   ├── storage/       # Storage services
│   │   │   │   └── use-cases/     # Business use cases
│   │   │   │       ├── errors/    # Use case errors
│   │   │   │       ├── answer-question.test.ts
│   │   │   │       ├── answer-question.ts
│   │   │   │       ├── authenticate-student.test.ts
│   │   │   │       ├── authenticate-student.ts
│   │   │   │       ├── choose-question-best-answer.test.ts
│   │   │   │       ├── choose-question-best-answer.ts
│   │   │   │       ├── comment-on-answer.test.ts
│   │   │   │       ├── comment-on-answer.ts
│   │   │   │       ├── comment-on-question.test.ts
│   │   │   │       ├── comment-on-question.ts
│   │   │   │       ├── create-question.test.ts
│   │   │   │       ├── create-question.ts
│   │   │   │       ├── delete-answer-comment.test.ts
│   │   │   │       ├── delete-answer-comment.ts
│   │   │   │       ├── delete-answer.test.ts
│   │   │   │       └── ... (more use cases)
│   │   │   └── enterprise/        # Enterprise layer
│   │   │       └── entities/      # Domain entities
│   │   │           ├── events/    # Domain events
│   │   │           ├── value-objects/  # Value objects
│   │   │           ├── answer-attachment-list.ts
│   │   │           ├── answer-attachment.ts
│   │   │           ├── answer-comment.ts
│   │   │           ├── answer.ts
│   │   │           ├── attachment.ts
│   │   │           ├── comment.ts
│   │   │           ├── instructor.ts
│   │   │           ├── question-attachment-list.ts
│   │   │           ├── question-attachment.ts
│   │   │           ├── question-comment.ts
│   │   │           ├── question.ts
│   │   │           └── student.ts
│   │   └── notification/          # Notification domain
│   └── infra/                     # Infrastructure layer
│       ├── auth/                  # Authentication infrastructure
│       ├── cache/                 # Cache implementations
│       ├── cryptography/          # Cryptography implementations
│       ├── database/              # Database access layer
│       ├── env/                   # Environment configurations
│       ├── events/                # Event implementations
│       ├── http/                  # HTTP controllers and routes
│       ├── storage/               # Storage implementations
│       ├── app.module.ts          # Main application module
│       └── main.ts                # Application entry point
├── test/                          # Test files
├── dist/                          # Compiled output
├── .gitignore                     # Git ignore rules
├── nest-cli.json                  # NestJS CLI configuration
├── package.json                   # Dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
└── README.md
```

## 🏗️ Architecture Overview

This project implements **Clean Architecture** with **Domain-Driven Design (DDD)**:

### **Core Layer** 
- **Entities**: Base classes for entities, aggregates, and value objects
- **Events**: Domain event system
- **Either**: Functional programming pattern for error handling
- **Repositories**: Repository base contracts

### **Domain Layer**
- **Forum Domain**: Complete forum management
  - **Application Layer**:
    - **Cryptography**: Password hashing and JWT encryption
    - **Repositories**: Data access contracts
    - **Storage**: File storage contracts
    - **Use Cases**: Business logic implementation
  - **Enterprise Layer**:
    - **Entities**: Domain entities (Question, Answer, Student, etc.)
    - **Events**: Domain events
    - **Value Objects**: Domain value objects

- **Notification Domain**: Notification management system

### **Infrastructure Layer**
- **Auth**: JWT authentication implementation
- **Cache**: Caching layer
- **Cryptography**: Bcrypt and JWT implementations
- **Database**: Database access implementations
- **Events**: Event handling implementations
- **HTTP**: REST API controllers
- **Storage**: File storage implementations

## 🔧 Available Scripts

### Development
```bash
# Development mode
npm run start

# Development mode with hot reload
npm run start:dev

# Production mode
npm run start:prod
```

### Testing
```bash
# Unit tests
npm run test

# End-to-end tests
npm run test:e2e

# Test coverage
npm run test:cov

# Watch mode for tests
npm run test:watch
```

### Build
```bash
# Build for production
npm run build
```

## 🔌 API Endpoints

The API provides comprehensive endpoints for forum management:

### Authentication
- **POST** `/sessions` - Student authentication

### Questions
- **GET** `/questions` - Get all questions
- **GET** `/questions/:id` - Get question by ID
- **POST** `/questions` - Create a new question
- **PUT** `/questions/:id` - Update a question
- **DELETE** `/questions/:id` - Delete a question

### Answers
- **GET** `/questions/:questionId/answers` - Get question answers
- **POST** `/questions/:questionId/answers` - Answer a question
- **PUT** `/answers/:id` - Update an answer
- **DELETE** `/answers/:id` - Delete an answer
- **PATCH** `/answers/:id/choose-as-best` - Choose best answer

### Comments
- **POST** `/questions/:questionId/comments` - Comment on question
- **POST** `/answers/:answerId/comments` - Comment on answer
- **DELETE** `/questions/comments/:id` - Delete question comment
- **DELETE** `/answers/comments/:id` - Delete answer comment

### Attachments
- **POST** `/attachments` - Upload attachment

*Detailed API documentation can be found at `/api/docs` when the server is running.*

## ✨ Key Features

- **Clean Architecture**: Separation of concerns with clear boundaries
- **Domain-Driven Design**: Rich domain model with business rules
- **SOLID Principles**: Following SOLID design principles
- **Functional Error Handling**: Using Either monad for error handling
- **Domain Events**: Decoupled domain event system
- **Comprehensive Testing**: Unit and integration tests for all layers
- **Authentication & Authorization**: JWT-based security
- **File Management**: Attachment system with storage abstraction
- **Caching**: Performance optimization with caching layer
- **Type Safety**: Full TypeScript implementation

## 🧪 Testing Strategy

The project includes comprehensive testing:

- **Unit Tests**: Testing individual use cases, entities, and value objects
- **Integration Tests**: Testing the interaction between layers
- **Domain Tests**: Ensuring business rules are properly implemented
- **Repository Tests**: Testing data access layer

## 🚀 Deployment

### Production Build
```bash
npm run build
npm run start:prod
```

### Docker (if applicable)
```bash
docker build -t nest-clean-architecture .
docker run -p 3000:3000 nest-clean-architecture
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Paulin** - [@itspaulin](https://github.com/itspaulin)

Project Link: [https://github.com/itspaulin/nest-clean-architecture](https://github.com/itspaulin/nest-clean-architecture)

## 🙏 Acknowledgments

- [NestJS](https://nestjs.com/) for the amazing framework
- [TypeScript](https://www.typescriptlang.org/) for type safety
- Clean Architecture community for architectural guidance
- DDD Community for domain modeling principles
- All contributors who helped make this project better

---

⭐ If you found this project helpful, please give it a star!
