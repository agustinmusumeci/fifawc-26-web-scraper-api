<div align="center">

<a href="https://www.fifa.com" target="_blank" title="Go to FIFA website"><img width="196px" alt="fifa logo" src="https://raw.githubusercontent.com/agustinmusumeci/fifawc-web-scraper-api/refs/heads/main/public/images/fifa-logo.png"></a>

<a name="readme-top"></a>

# The FIFA Web Scraper API

API that provides data for teams, mathces and groups for FIFA 2026 Men's World Cup<br/>with **JS** on the backend. The goal is to achieve a free API for all FIFA Worlds Cup data, so feel free to help!

**Share the project with your friends**

[![Share on X][x_share_img]][x_share_url] [![Share on Telegram][telegram_share_img]][telegram_share_url] [![Share on WhatsApp][whatsapp_share_img]][whatsapp_share_url] [![Share on Reddit][reddit_share_img]][reddit_share_url]

</div>

## Project structure

```text
/
│   │ 
├── src/
│   │ 
│   ├── app.ts 
│   ├── server.ts 
│   │ 
│   ├── routes/
│   │   └── groupsRouter.ts
│   │   └── matchesRouter.ts
│   │   └── teamsRouter.ts
│   │ 
│   ├── controllers/
│   │   └── groupsController.ts
│   │   └── matchesController.ts
│   │   └── teamsController.ts
│   │
│   ├── repositories/
│   │   └── groupsRepository.ts
│   │   └── matchesRepository.ts
│   │   └── teamsRepository.ts
│   │ 
│   ├── scrapers/
│   │   └── scarper.js
│   │   └── groupsScraper.js
│   │   └── matchesScraper.js
│   │   └── teamsScraper.js
│   │
│   └── tests/
│       └── app.test.ts
│       └── groups.test.ts
│       └── matches.test.ts
│       └── teams.test.ts
│ 
├── public/
│   └── images/
│       └── fifa-logo.png
│  
├── dist/ (compiled application)
│  
└── package.json
└── LICENSE
└── CONTRIBUTING
└── jest.config.mjs
└── tsconfig.json
```

## 📖 Quick start and user guide

### Installation

Install the dependencies using any package manager that you want.

```console
npm install
```

### Running the API

By default the API will run on **http://localhost:4000**

```console
npm run dev
```

If you want to build the application

```console
npm run build
```

And the you will run the compiled application with

```console
npm start
```

### Endpoints

- Get all teams that clasified or filter by its full name

```console
/teams
```

```console
/teams?names=USA,mexico,CANADA...
```

- Get all groups formed or filter by its letter

```console
/groups
```

```console
/groups?groups=A,b,C...
```

- Get all matches schedule as well as the teams that participate in that match and filter by date with the format DD/MM/YYYY

```console
/matches
```

```console
/groups?dates=11/06/2026,12/06/2026...
```

</div>

<!-- Author links -->

[author_url]: https://github.com/agustinmusumeci

<!-- Social links -->

[x_share_url]: https://x.com/intent/tweet?hashtags=api%2Cgo%2Chtmx&text=Free%20API%20for%20FIFA%202026%20Men%27s%20World%20Cup%20https%3A%2F%2Fgithub.com%2Fagustinmusumeci%2Ffifawc-web-scraper-api
[telegram_share_url]: https://t.me/share/url?text=Free%20API%20for%20FIFA%202026%20Men%27s%20World%20Cup%20https%3A%2F%2Fgithub.com%2Fagustinmusumeci%2Ffifawc-web-scraper-api
[whatsapp_share_url]: https://api.whatsapp.com/send?text=Free%20API%20for%20FIFA%202026%20Men%27s%20World%20Cup%20https%3A%2F%2Fgithub.com%2Fagustinmusumeci%2Ffifawc-web-scraper-api
[reddit_share_url]: https://www.reddit.com/submit?title=Free%20API%20for%20FIFA%202026%20Men%27s%20World%20Cup%20https%3A%2F%2Fgithub.com%2Fagustinmusumeci%2Ffifawc-web-scraper-api
[x_share_img]: https://img.shields.io/badge/x_(twitter)-black?style=for-the-badge&logo=x
[telegram_share_img]: https://img.shields.io/badge/telegram-black?style=for-the-badge&logo=telegram
[whatsapp_share_img]: https://img.shields.io/badge/whatsapp-black?style=for-the-badge&logo=whatsapp
[reddit_share_img]: https://img.shields.io/badge/reddit-black?style=for-the-badge&logo=reddit
