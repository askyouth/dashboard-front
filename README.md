# ASK Dashboard

Dashboard app consists of two parts, [Node.js](https://nodejs.org/) [API](https://github.com/askyouth/dashboard-api) on top of [hapi](https://hapijs.com/) framework and [frontend](https://github.com/askyouth/dashboard-front) in [Angular.js](https://angularjs.org/).

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
**Table of Contents**

- [ASK Dashboard](#ask-dashboard)
    - [Requirements](#requirements)
    - [Setup](#setup)
        - [Setup API](#setup-api)
        - [Clone repository](#clone-repository)
        - [Setup environment](#setup-environment)
        - [Start](#start)
    - [License](#license)

<!-- markdown-toc end -->

## Requirements

* Node.js (5 or newer)
* Yarn

## Setup

### Setup API

Please refer to documentation for [askyouth/dashboard-api](https://github.com/askyouth/dashboard-api) for installation instructions.

### Clone repository

```bash
git clone https://github.com/askyouth/dashboard-front.git 
yarn
```

### Setup environment

Edit `config/production.json` and fill out required variables.

### Start

```bash
NODE_ENV=production yarn start
```

## License

[MIT](https://github.com/askyouth/dashboard-front/blob/master/LICENSE)

---

![EU Erasmus+](public/images/eu_flag_co_funded.jpg)

This project has been funded with support from the European Commission. This publication reflects the views only of the author, and the Commission cannot be held responsible for any use that may be made of the information contained therein.
