# Gradle Integration

This project now includes Gradle build automation. The Gradle setup uses the Node Gradle plugin to manage npm tasks.

## Prerequisites

- Java 8 or higher (required for Gradle)
- Node.js and npm will be automatically downloaded by Gradle

## Available Gradle Tasks

Run tasks using `./gradlew <task>` on macOS/Linux or `gradlew.bat <task>` on Windows:

- `./gradlew installDependencies` - Install npm dependencies
- `./gradlew dev` - Run the development server
- `./gradlew buildApp` - Build the production application
- `./gradlew lint` - Run ESLint
- `./gradlew preview` - Preview the production build
- `./gradlew clean` - Clean build artifacts
- `./gradlew tasks` - List all available tasks

## Quick Start

```bash
# Install dependencies and build
./gradlew build

# Run development server
./gradlew dev

# Build for production
./gradlew buildApp
```

## Configuration

The Gradle configuration is in `build.gradle` and uses:
- Node.js version: 20.11.0
- npm version: 10.2.4
- Node Gradle Plugin: 7.0.2

Node.js and npm will be automatically downloaded to the `build` directory if not found on your system.
