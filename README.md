# frida-flutter-biometric-storage-hook

This repo contains a Frida agent that lets you hook read and write method for [flutter biometric storage](https://pub.dev/packages/biometric_storage) package.

Go into [index.ts](agent/index.ts) to see the code.

# Usage

- Clone the repo
- `npm i`
- `npm run watch`
- `frida -U <app-name> -i <path-to-_agent.js>`