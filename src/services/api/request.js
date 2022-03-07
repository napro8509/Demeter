import axios from 'axios';
import querystring from 'query-string';
import AppNavigator from '../../navigation/AppNavigator';

import { ErrorCode, RequestOptions, BaseUrl, RequestMethod } from './constants';

/*
HTTP response: {
  // `data` is the response that was provided by the server
  data: {},
  // `status` is the HTTP status code from the server response
  status: 200,
  // `statusText` is the HTTP status message from the server response
  statusText: 'OK',
  // `headers` the headers that the server responded with
  // All header names are lower cased
  headers: {},
  // `config` is the config that was provided to `axios` for the request
  config: {},
  // `request` is the request that generated this response
  // It is the last ClientRequest instance in node.js (in redirects)
  // and an XMLHttpRequest instance the browser
  request: {}
}
*/

const getServerErrorMessage = resp => {
	const { data, status } = resp;
	if (typeof data === 'string') {
		return { code: status, errorMessage: data };
	}
	if (resp.error && typeof resp.error === 'string') {
		return { code: status, errorMessage: resp.error };
	}
	const errors = resp?.errors || resp?.data?.errors || {};
	if (errors) {
		let errorMessage = '';
		let paramName = '';
		errors.forEach(({ message, params, param }) => {
			errorMessage += message;
		});
		return { code: status, errorMessage: errorMessage, errorType: paramName };
	}
	return null;
};

function _handleErrorResponse(error) {
	if (typeof error === 'string') {
		return Promise.reject({ code: ErrorCode.Unknown, errorMessage: error });
	}
	const response = {};
	if (error.response) {
		// The request was made and the server responded with a status code
		const { data, status: code, statusText, headers } = error.response;
		switch (code) {
			case ErrorCode.BadGateway:
				return Promise.reject({ code, errorMessage: 'Bad Gateway' });
			case ErrorCode.BadRequest:
				return Promise.reject(getServerErrorMessage(error.response));
			default:
				break;
		}
		const message = data.error || statusText || headers.status;
		if (message) {
			return Promise.reject({ code, errorMessage: message });
		}
		return Promise.reject(getServerErrorMessage(error.response));
	}
	if (error.request) {
		// The request was made but no response was received
		response.code = ErrorCode.Timeout;
		response.errorMessage = 'Request timeout';
		return Promise.reject(response);
	}
	return Promise.reject(getServerErrorMessage(error));
}

async function request({ params, method, headers, url, ...otherParams }) {
	const options = {
		...RequestOptions,
		...otherParams,
		url: url ? url : BaseUrl,
		method,
	};
	options.headers = {
		'Content-Type': 'application/json',
		Version: '1.0.1',
		...headers,
	};
	if (method !== 'get' && params) {
		options.data = params;
	}
	// console.log('request: ', options);
	try {
		const resp = await axios(options);
		// HTTP response
		const { status, statusText, headers } = resp;
		// console.log('resp: ', resp);
		if (status !== ErrorCode.HttpSuccess) {
			return Promise.reject({
				code: status,
				errorMessage: statusText || headers.status,
			});
		}
		return resp.data;
	} catch (error) {
		// console.log('error: ', error);
		return _handleErrorResponse(error);
	}
}

function token() {
	return token ? { Authorization: `Bearer ${token}` } : {};
}

async function serverRequest({ headers, showLoading, ...otherParams }) {
	try {
		showLoading && AppNavigator.showLoading();
		const response = await request({
			headers: { ...headers, ...token() },
			...otherParams,
		});
		const { data } = response || {};
		showLoading && AppNavigator.hideLoading();
		if (!data) {
			return Promise.reject(getServerErrorMessage(response));
		}
		return response;
	} catch (error) {
		console.log('error: ', error);
		showLoading && AppNavigator.hideLoading();
		return Promise.reject(error);
	}
}

function get(options) {
	const { params = {}, url = '' } = options;
	const _url = Object.keys(params).length !== 0 ? `${url}?${querystring.stringify(params)}` : url;
	return serverRequest({
		...options,
		url: _url,
		method: RequestMethod.get,
	});
}

function _bodyRequest(options, method) {
	return serverRequest({
		...options,
		params: JSON.stringify(options.params),
		method,
	});
}

function post(options) {
	return _bodyRequest(options, RequestMethod.post);
}

function deleteRequest(options) {
	return _bodyRequest(options, RequestMethod.delete);
}

function put(options) {
	return _bodyRequest(options, RequestMethod.put);
}

export { request, get, post, put, deleteRequest };
