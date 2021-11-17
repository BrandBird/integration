<a href="https://brandbird.app/?ref=github"><img src="/assets/header.png"/></a>

<div align="center">
  <img src="https://badgen.net/npm/v/@brandbird/integration" alt="Latest release" />
  <img src="https://badgen.net/bundlephobia/minzip/@brandbird/integration" alt="minzipped size"/>
  <img src="https://github.com/brandbird/integration/workflows/CI/badge.svg" alt="Build Status" />
</div>

<br />
<div align="center"><strong>The official library for integrating BrandBird into your webapp.</strong></div>
<div align="center">Interested? Just hit us up at <a href="mailto:jim@brandbird.app">jim@brandbird.app</a></div>
<br />
<div align="center">
  <a href="https://brandbird.app/">Website</a> 
  <span> · </span>
  <a href="https://twitter.com/brandbirdapp">Twitter</a>
</div>

<br />
<div align="center">
  <sub>Made by <a href="https://twitter.com/d__raptis">Jim Raptis</a> ✨</sub>
</div>
<br />

## Installation

#### With NPM

```sh
npm i @brandbird/integration
```

#### With yarn

```sh
yarn add @brandbird/integration
```

## Usage

> Be aware that we restrict the integration of Brandbird by platforms at the moment. Are you interested? Hit us up at jim@brandbird.app

```ts
import { openBrandBird } from '@brandbird/integration';

async function() {
  try {
    const blob = await openBrandBird(
      { 
        provider: 'Google', // The name of your platform
        src: 'Image in BASE64 format or public URL', // Optional: input image to editor
      }
    );

    // do something with the blob, e.g. create an object url to show it in an img tag:
    // URL.createObjectURL(blob);
  } catch (error) {
    // error handling
  }
}
```
