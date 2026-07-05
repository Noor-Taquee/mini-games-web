# Contributing

Thank you for your interest in contributing to this project.

## Before You Start

- Check existing issues and discussions before opening a new one.
- For bug reports, include clear reproduction steps and expected behavior.
- For feature requests, describe the problem the change would solve.

## Development

- Fork the repository.

```bash
git clone https://github.com/Noor-Taquee/mini-games-web.git
cd mini-games-web
```

- Create a branch for your change.

```bash
git checkout main
git pull origin main
git checkout -b feature/<your-change>
```

- Install dependencies

```bash
npm ci
```

- Development server

```bash
npm run dev
```

- Make your changes.

- Test your work locally.

```bash
npm run build
npm run preview
```

- Format and lint your code before committing.

```bash
npm run format
npm run lint
```

- Open a pull request with a clear description of the change.

## Pull Requests

Please make sure your pull request:

- Has a clear title and description
- Explains the purpose of the change
- Includes testing notes where relevant
- Links related issues when applicable

## Code of Conduct

By participating in this project, you agree to follow the guidelines in [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md).
