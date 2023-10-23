import axios from "axios";

const request = axios.create({
	baseURL: 'http://localhost:8081',
	timeout: 10000,
	headers: { 'X-Custom-Header': 'foobar' },
});

request.interceptors.request.use(
	(config) => {
		config.headers['Access-Control-Allow-Origin'] = '*';
		config.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE';
		config.headers['Access-Control-Allow-Headers'] =
			'Origin, X-Requested-With, Content-Type, Accept, Authorization';
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default request;