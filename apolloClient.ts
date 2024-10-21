import { ApolloClient, InMemoryCache, ApolloLink, createHttpLink } from '@apollo/client';
import { toastGenerator } from './src/utils/toastGenerator';

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URI,
});

const durationLink = new ApolloLink((operation, forward) => {
  const startTime = performance.now();

  const observable = forward(operation);

  setTimeout(() => {
    const endTime = performance.now();
    const duration = endTime - startTime; 

    if (duration > 4000) {
      toastGenerator('warning', 'It seems that the call is taking longer than usual. We are working to get you a response, please hold on for a moment...')
    }
  }, 2000);

  return observable;
});

const client = new ApolloClient({
  link: durationLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
