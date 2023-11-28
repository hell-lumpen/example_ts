import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface Error {
    type: string;
    title: string;
    status: number;
    detail: string;
    instance: string;
    exception_description: string;
}

export interface ApiResult<T> {
    isLoading: boolean;
    isError: boolean;
    data: T | null;
    error?: Error;
}

class ApiService {
    static INITIAL_STATE : ApiResult<any> = {isLoading: false, isError: false, data: null, error: undefined};
    static PREREQUEST_STATE : ApiResult<any> = {isLoading: true, isError: false, data: null, error: undefined};

    private readonly baseURL: string;
    private headers: Record<string, string>[] = [];

    private constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    public static create(baseURL: string): ApiService {
        return new ApiService(baseURL);
    }

    public withHeaders(headers: Record<string, string>[]): this {
        this.headers.push(...headers);
        return this;
    }
    private async request<T>(
        config: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> {
        try {
            return await axios({
                baseURL: this.baseURL,
                ...config,
            });
        } catch (error: any) {
            return Promise.reject({
                response: error.response,
                message: `API Error: ${error.message}`,
            });
        }
    }

    private getDefaultHeaders(): Record<string, string> {
        const defaultHeaders: Record<string, string> = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3002',
        };

        const authToken = localStorage.getItem('token');
        if (authToken) {
            defaultHeaders['Authorization'] = `Bearer ${authToken}`;
        }

        return defaultHeaders;
    }

    async get<T>(
        url: string,
        params?: any,
        additionalHeaders?: Record<string, string>[]
    ): Promise<ApiResult<T>> {
        const result: ApiResult<T> = {
            isLoading: true,
            isError: false,
            data: null,
            error: undefined,
        };

        try {
            const headers = {
                ...this.getDefaultHeaders(),
                ...(additionalHeaders ? Object.assign({}, ...additionalHeaders) : {}),
                ...this.getHeadersObject(),
            };

            const config: AxiosRequestConfig = {
                method: 'get',
                url,
                params,
                headers,
            };

            console.log('Before request' + JSON.stringify(result));
            const response = await this.request<T>(config);
            console.log('After request' + JSON.stringify(result));

            result.data = response.data;
        } catch (error: any) {
            result.isError = true;
            result.error = error.response ? error.response.data : { detail: error.message };
        } finally {
            result.isLoading = false;
            console.log('Finally block' + JSON.stringify(result));
        }
        return result;
    }

    async post<T>(
        url: string,
        data?: any,
        additionalHeaders?: Record<string, string>[]
    ): Promise<ApiResult<T>> {
        const result: ApiResult<T> = {
            isLoading: true,
            isError: false,
            data: null,
            error: undefined,
        };

        try {
            const headers = {
                ...this.getDefaultHeaders(),
                ...(additionalHeaders ? Object.assign({}, ...additionalHeaders) : {}),
                ...this.getHeadersObject(),
            };

            const config: AxiosRequestConfig = {
                method: 'post',
                url,
                data,
                headers,
            };

            const response = await this.request<T>(config);
            result.data = response.data;
        } catch (error: any) {
            result.isError = true;
            result.error = error.response ? error.response.data : { detail: error.message };
        } finally {
            result.isLoading = false;
        }
        return result;
    }

    async put<T>(
        url: string,
        data?: any,
        additionalHeaders?: Record<string, string>[]
    ): Promise<ApiResult<T>> {
        const result: ApiResult<T> = {
            isLoading: true,
            isError: false,
            data: null,
            error: undefined,
        };

        try {
            const headers = {
                ...this.getDefaultHeaders(),
                ...(additionalHeaders ? Object.assign({}, ...additionalHeaders) : {}),
                ...this.getHeadersObject(),
            };

            const config: AxiosRequestConfig = {
                method: 'put',
                url,
                data,
                headers,
            };

            const response = await this.request<T>(config);
            result.data = response.data;
        } catch (error: any) {
            result.isError = true;
            result.error = error.response ? error.response.data : { detail: error.message };
        } finally {
            result.isLoading = false;
        }
        return result;
    }

    async delete<T>(
        url: string,
        additionalHeaders?: Record<string, string>[]
    ): Promise<ApiResult<T>> {
        const result: ApiResult<T> = {
            isLoading: true,
            isError: false,
            data: null,
            error: undefined,
        };

        try {
            const headers = {
                ...this.getDefaultHeaders(),
                ...(additionalHeaders ? Object.assign({}, ...additionalHeaders) : {}),
                ...this.getHeadersObject(),
            };

            const config: AxiosRequestConfig = {
                method: 'delete',
                url,
                headers,
            };

            const response = await this.request<T>(config);
            result.data = response.data;
        } catch (error: any) {
            result.isError = true;
            result.error = error.response ? error.response.data : { detail: error.message };
        } finally {
            result.isLoading = false;
        }
        return result;
    }

    private getHeadersObject(): Record<string, string> {
        return this.headers.reduce((acc, header) => {
            const [name, value] = Object.entries(header)[0];
            acc[name] = value;
            return acc;
        }, {} as Record<string, string>);
    }
}

export class ApiServiceBuilder {
    private readonly baseURL: string;
    private headers: Record<string, string>[] = [];

    private constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    public static builder(baseURL: string): ApiServiceBuilder {
        return new ApiServiceBuilder(baseURL);
    }

    public withHeader(name: string, value: string): this {
        this.headers.push({ [name]: value });
        return this;
    }

    public build(): ApiService {
        const apiService = ApiService.create(this.baseURL);
        apiService.withHeaders(this.headers);
        return apiService;
    }
}

export default ApiService;