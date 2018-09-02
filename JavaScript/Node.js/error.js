exports.error = {
	UndefinedParameterError: (_message, _error) => {
		_error.statusCode = 400;
		_error.code = 'UndefinedParameterException';
		_error.message = 'bad' + _message;
		return _error;
	},
	BadParameterError: (_message, _error) => {
		_error.statusCode = 400;
		_error.code = 'BadParameterException';
		_error.message = 'bad' + _message;
		return _error;
	},
	BadRequestError: (_message, _error) => {
		_error.statusCode = 400;
		_error.code = 'BadRequestException';
		_error.message = 'bad request';
		return _error;
	},
	NotFoundError: (_message, _error) => {
		_error.statusCode = 404;
		_error.code = 'NotFoundException';
		_error.message = _message + 'not found';
		return _error;
	},
	UnauthorizedError: (_message, _error) => {
		_error.statusCode = 401;
		_error.code = 'UnauthorizedException';
		_error.message = 'bad' + _message;
		return _error;
	},
	ServerError: (_error) => {
		_error.statusCode = 400;
		_error.code = 'Exception';
		_error.message = 'Server Error';
		return _error;
	}
};

exports.responseError = (_err, _req, _res, _next) => {
	const errorJson = {
		errorCode: _err.code || 'Exception',
		message: _err.message || 'Internal Server Error',
		statusCode: _err.statusCode || 500,
		date: new Date().toJSON().toString(),
		stack: _err.stack
	};
	
	if (_res.headersSent) return _next(_err);
	else _res.status(_err.statusCode || 500).json(errorJson);
};