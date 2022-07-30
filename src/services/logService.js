// import * as Sentry from '@sentry/browser'
// import { BrowserTracing } from '@sentry/tracing'

const init = () => {
  // Sentry.init({
  //   dsn:
  //     'https://49d5879daac34c1a947150508c20e833@o1315498.ingest.sentry.io/6605816',
  //   integrations: [new BrowserTracing()],
  //   tracesSampleRate: 1.0,
  // })
}

const logException = (error) => {
  console.log(error)
  //Sentry.captureException(error)
}

const logError = (error) => {
  console.log(error)
  //Sentry.captureMessage(error)
}

const logger = {
  init,
  logException,
  logError,
}

export default logger
