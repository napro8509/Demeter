import React from 'react';
import {
	ApolloClient,
	ApolloLink,
	ApolloProvider,
	HttpLink,
	concat,
	InMemoryCache,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setContext } from '@apollo/client/link/context';

import * as Constants from '../constants';

const errorLink = onError(({ graphQLErrors, networkError }) => {
	console.log('graphQLErrors', graphQLErrors);
	console.log('networkError', networkError);
	if (graphQLErrors)
		graphQLErrors.forEach(({ message, locations, path }) =>
			console.log(
				`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
			)
		);
	if (networkError) console.log(`[Network error]: ${networkError}`);
});

const getToken = async () => {
	const token = await AsyncStorage.getItem(Constants.ASYNC_AUTH_TOKEN);
	return token;
};

const auth = setContext(async (operation, forward) => {
	const token = await getToken();
	const headers = {
		Authorization: `Bearer ${token}`,
	};

	return { headers };
});

const httpLink = new HttpLink({
	uri: Constants.GRAPHQL_URL,
});

const client = new ApolloClient({
	link: concat(errorLink, concat(auth, httpLink)),
	// link: concat(errorLink, httpLink),
	cache: new InMemoryCache(),
});

const withApollo = WrappedComponent => {
	return (
		<ApolloProvider client={client}>
			<WrappedComponent />
		</ApolloProvider>
	);
};

export default withApollo;
