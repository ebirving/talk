import ApolloClient, {addTypename} from 'apollo-client';
import {networkInterface} from './transport';
import {SubscriptionClient, addGraphQLSubscriptions} from 'subscriptions-transport-ws';

// TODO: replace absolute reference with something loaded from the store/page.
const wsClient = new SubscriptionClient('ws://192.168.5.5:3000/api/v1/live', {
  reconnect: true
});

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient,
);

export const client = new ApolloClient({
  connectToDevTools: true,
  addTypename: true,
  queryTransformer: addTypename,
  dataIdFromObject: (result) => {
    if (result.id && result.__typename) { // eslint-disable-line no-underscore-dangle
      return `${result.__typename}_${result.id}`; // eslint-disable-line no-underscore-dangle
    }
    return null;
  },
  networkInterface: networkInterfaceWithSubscriptions,
});

export default client;

