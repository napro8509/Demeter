const BaseUrl = 'https://stag-api.demeter.vn/graphql'; // dev

const ErrorCode = {
	HttpSuccess: 200,
	Unknown: -1,
	Timeout: 408,
	BadGateway: 502,
	BadRequest: 400,
	UserNotFound: 1004,
	CannotEditOrder: 1032,
	ZeroResult: 'ZERO_RESULTS',
};

const RequestMethod = {
	get: 'get',
	post: 'post',
	put: 'put',
	delete: 'delete',
};

const RequestTimeout = 30000;
const RequestOptions = { timeout: RequestTimeout };

export { ErrorCode, RequestMethod, RequestTimeout, RequestOptions, BaseUrl };
