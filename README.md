# Flux Companion (Playground App)

**Flux Companion** is the **official mobile playground** for the [Flux App Inventor Extension](https://github.com/aarizish/flux-extension).
It lets you **test APIs**, preview **JSON responses**, and validate configurations **before** implementing them in your App Inventor projects.

Built with **Ionic + React** and **Capacitor**, Flux Companion runs locally on your device. No sign-ups, no analytics, and no external dependencies.


## Features

* Test any REST or RapidAPI endpoint directly on your phone
* Validate API headers, parameters, and authentication keys
* View formatted JSON responses in real time
* Built with Ionic for native-like performance
* 100% local: no data collection, no external tracking

## Tech Stack

| Tool                                                                    | Purpose         |
| ----------------------------------------------------------------------- | --------------- |
| [Ionic + React](https://ionicframework.com/react)                         | UI framework    |
| [Capacitor](https://capacitorjs.com/)                                   | Native runtime  |
| [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) | Networking      |
| [React Router](https://reactrouter.com/)                                | Page navigation |
| [Ionicons](https://ionic.io/ionicons)                                   | App icons       |

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/aarizish/flux-companion.git
cd flux-companion
```

### Install Dependencies

```bash
npm i
```

### Run in Development Mode

```bash
ionic serve
```

### Build for Production

```bash
ionic build
```

### Run on a Device

To open in a native container:

```bash
npx cap sync
npx cap open android
```

## Feedback & Contributions

Found a bug or have an idea?
Open an issue or start a discussion:

> [github.com/aarizish/flux-companion/issues](https://github.com/aarizish/flux-companion/issues)

Contributions, ideas, and pull requests are welcome.

## License

Licensed under the **MIT License**.
See [LICENSE](LICENSE) for details.

## Credits

* Built with **Ionic + React** and **Capacitor**
* Networking powered by the **Fetch API**
* Designed for the **Flux** App Inventor extension

**Flux Companion: Your local API testing lab for Flux.**
**Test. Verify. Build smarter.**