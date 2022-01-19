import { post } from './request';

const login = (username, password) => {
	const postData = {
		query: `
        mutation  loginUser(
			$username: String!
			$password: String!
		){
            login(loginUser:{password: $password, username:$username}) {
                    accessToken
            }
        }
      `,
		variables: {
			username,
			password,
		},
	};
	return post({ params: postData, showLoading: true }).then(({ data }) => data);
};

const register = ({ email = 'abc@gmail.com', password, phone = '0989333222' }) => {
	const postData = {
		query: `
		mutation  registerUser(
			$password: String!
			$email: String!
			$phone: String!

		){
            register(registerUser:{password: $password, email: $email, phone: $phone}) {
                    id
            }
        }
		`,
		variables: {
			email,
			phone,
			password,
		},
	};
	return post({ params: postData, showLoading: true }).then(({ data }) => data);
};

const loginSocial = ({ accessToken, email, firstName, lastName, provider, socialId }) => {
	const postData = {
		query: `
			mutation input(
				$accessToken: String!
				$email: String!
				$firstName: String!
				$lastName: String!
				$socialId: String!
			)
			{
				loginSocial(input:{accessToken: $accessToken, email: $email, firstName: $firstName, lastName: $lastName, provider: ${provider}, socialId: $socialId}) {
					accessToken
				}
			}
		`,
		variables: {
			accessToken,
			email,
			firstName,
			lastName,
			provider,
			socialId,
		},
	};
	return post({ params: postData, showLoading: true }).then(({ data }) => data);
};

export default {
	login,
	register,
	loginSocial,
};
