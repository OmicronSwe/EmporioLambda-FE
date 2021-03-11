# FrontEnd-EmporioLambda-POC

![Workflow status](https://github.com/OmicronSwe/EmporioLambda-FE/actions/workflows/deployWebsite.yml/badge.svg)
[![Code coverage](https://codecov.io/gh/OmicronSwe/EmporioLambda-FE/branch/master/graph/badge.svg?token=S45ES4F9UL)](https://codecov.io/gh/OmicronSwe/EmporioLambda-FE)


## Requisiti
Serve l'ultima versione di Node.js, che vi installerà il comando `npm` e l'installazione di **vercel** per il download delle variabili d'ambiente che serviranno per interfacciarsi in locale con lo **stage local** di AWS

## Installazione
 ### Cloning della repository e installazione dipendenze:

```
git clone https://github.com/OmicronSwe/EmporioLambda-FE.git
```
spostarsi dentro la cartella e lanciare `npm install` che installerà le dipendenze

### Installazione vercel

1. Lanciare il comando `npm i -g vercel` (se non già installato)
2. Lanciare il comando `vercel env pull`, il quale vi chiederà le credenziali di vercel che si trovano su discord nel canale *#resources*. 
3. Lanciare il comando `vercel link`. Probabilmente vi chiedrà alcune configurazioni, in questo caso guardate la sezione [Project Linking](https://vercel.com/docs/cli).  

- `Which scope do you want to deploy to -> omicronswe`
- `What’s the name of your existing project? -> emporio-lambda-fe`

4. Ridare il comando `vercel env pull`. Questo comando scaricherà le variabili d'ambiente.

Dopo ciò vercel non dovrebbe più servire perchè il deploy avviene tramite github, e vercel serve solo per scaricare queste variabili.

## Sviluppo
E' presente un esempio di sviluppo, il quale è suddiviso in cartelle quali:
- **components**: componenti utilizzati dalle pagine web create
- **pages**: pagine che verranno visualizzate all'interno del sito
- **public**: immagini o elementi estetici del sito
- **styles**: css del sito

#### ⚠️ Questa struttura è da prendere come esempio, non è vincolante, ma serve comunque un ordine per tutto, sul quale dobbiamo discutere.

## Analisi statica
Viene fornita l'analisi statica di Prettier e ESLint. I controlli effettuati sono descritti nei file `.eslintrc.js` e `.prettierrc.js`
```
npm run lint           #controlla lo stile del codice tramite lint e prettier, fixando gli errori dove possibile
npm run checkWithLint   #controlla lo stile del codice tramite lint e prettier
```

Nelle *Github Actions* viene utilizzato `npm run checkWithLint`, senza il *fix* (per evitare correzioni automatiche non volute o nocive), quindi potrebbe trovare errori e rifiutare la build. Molte volte per fixare questi errori si può lanciare `npm run lint` da locale oppure fixare gli errori a mano.

## Testing
Per il testing viene utilizzato [Cypress](https://docs.cypress.io/guides/overview/why-cypress.html#In-a-nutshell). I test vanno inseriti nella cartella `cypress/integration`. All'interno della cartella `cypress/plugins` e `cypress/support` sono inseriti alcuni file relativi alla configurazione di esso (non dovrebbero essere toccati se è tutto configurato bene). Per lanciare i test lanciare il comando `npm run test`. Cypress mostrerà anche il video del test eseguito e i relativi screenshots rispettivamente nella cartella `cypress/videos` e `cypress/screenshots` (tali cartelle non vengono versionate quindi saranno disponibili solo lanciando il comando del test **localmente**) . E' presente un file di test come esempio.

## Code Coverage
GitHub inserirà automaticamente il code coverage dopo aver eseguito i test, se questi hanno tutti esito positivo. Il code coverage è disponibile all'indirizzo https://app.codecov.io/gh/OmicronSwe/EmporioLambda-FE/

## Visualizzazione sito
Per visualizzare il sito creato, in locale, si deve lanciare il comando `npm run dev` il quale hosterà il sito all'indirizzo http://localhost:3000/. Per meaggiori info vedere la documentazione [Next.js](https://nextjs.org/docs).

## Deploy
Useremo 3 enviroment per lo sviluppo:

- `production` : Tutto ciò che viene pushato in `master`, prodotto finito. Richiamerà le API dello stage `staging` di AWS 
- `preview` : Tutto ciò che viene pushato nel branch `develop`, prodotto che può essere testato liberamente dagli sviluppatori. Richiamerà le API dello stage `test` di AWS
- `local` : Tutto ciò che viene utilizzato localmente, quindi tramite il comando `npm run dev`. Richiamerà le API dello stage `local` di AWS

L'indirizzo del sito del deploy si trova nella descrizione della repository (per il sito in **production**), oppure come commento dopo il deploy da parte delle *GitHub Actions* (click sul simbolo del messaggio (💬) a sinistra della spunta verde -> andare in fondo alla pagina) 

#### ⚠️ Non si deve mai deployare in locale da vercel (tramite i comandi di vercel), perchè il deploy comunque avverrebbe in **preview** o **production**. Purtroppo esistono solo questi due stage (preview e production) per il deploy online del sito.

## ENV Cognito
- NEXT_PUBLIC_SITE=http://localhost:3000 
- COGNITO_CLIENT_ID= id app cognito
- COGNITO_CLIENT_SECRET=
- COGNITO_DOMAIN= dominio app cognito (senza 'https://')
- COGNITO_LOGOUT_URL= url di logout app cognito
- NEXTAUTH_URL=http://localhost:3000 (Da modificare solo in production (in teoria?))