# Ledger — Wallet Account Frontend

A React (Vite) front end for the `wallet` Spring Boot account service. It talks to:

- `GET /account/allaccounts`
- `POST /account/create`
- `PUT /account/update/{id}`
- `DELETE /account/delete/{id}`

## Run it

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`. By default it calls the backend at `http://localhost:8080`.
To point at a different host, copy `.env.example` to `.env` and set `VITE_API_BASE_URL`.

## Enable CORS on the backend

The `wallet` Spring Boot project doesn't currently allow cross-origin requests, so calls from
`localhost:5173` to `localhost:8080` will fail in the browser until you add a CORS config. The
simplest fix is a global config bean:

```java
package com.transmoney.wallet.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/account/**")
                        .allowedOrigins("http://localhost:5173")
                        .allowedMethods("GET", "POST", "PUT", "DELETE");
            }
        };
    }
}
```

Drop that in `src/main/java/com/transmoney/wallet/config/WebConfig.java` and restart the backend.

## What's here

- **Ledger table** of accounts with search, and type/status filters.
- **Slide-over panel** to open a new account or edit an existing one (account number is
  server-assigned and read-only after creation, matching the backend's `AccountServiceImp`).
- **Delete confirmation** dialog before removing an account.
- **Toasts** for success/error feedback, and a connection-status indicator in the header for
  when the backend is unreachable.
- Fully responsive: the ledger table collapses into stacked cards below 860px.

## Project structure

```
src/
  api.js                     fetch wrapper around the account endpoints
  utils.js                   currency formatting + account type list
  App.jsx                    state, filtering, and wiring
  components/
    Masthead.jsx
    SummaryStrip.jsx
    AccountLedger.jsx
    AccountPanel.jsx
    ConfirmDialog.jsx
    ToastStack.jsx
  styles.css
```
