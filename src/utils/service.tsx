import type { AxiosInstance, AxiosRequestConfig } from "axios";
import axios from "axios";

import { Endpoint, Method } from "../settings/endpoint";
import { IResponseType } from "../types/response";
import type { IParameter } from "./parameter";
import { Parameter } from "./parameter";

class Service {
    protected axios: AxiosInstance;

    constructor(accessToken?: string, isSSR: boolean = false) {
        const baseURL = isSSR
            ? import.meta.env.VITE_BLUEJACK_22_1_PUBLIC_LOCAL_API_URL
            : import.meta.env.VITE_BLUEJACK_22_1_PUBLIC_API_URL;
        const axiosConfig: AxiosRequestConfig = {
            baseURL,
            headers: {
                Authorization: accessToken ? `Bearer ${accessToken}` : "",
                "Content-Type": "application/json",
            },
        };
        this.axios = axios.create(axiosConfig);
    }

    /**
     * NOTE: This method returns 'any' data type because it can return anything
     *       based on the response from the backend.
     */
    private async getResponse(
        method: Method,
        data: any,
        url: string
    ): Promise<any> {
        if (method === Method.GET) return this.axios.get(url, data);
        if (method === Method.POST) return this.axios.post(url, data);
        if (method === Method.PUT) return this.axios.put(url, data);
        if (method === Method.PATCH) return this.axios.patch(url, data);
        return this.axios.delete(url, { data });
    }

    public async request<T>(
        endpoint: Endpoint,
        id: string = "",
        data: any = {},
        parameters: IParameter[] = []
    ) {
        let result: IResponseType<T> = {
            data: "Server error please contact Blue Jacket Team",
            isError: true,
        };
        try {
            let url = `${endpoint.url}/${id}`;
            if (parameters.length > 0) {
                const parameterService = new Parameter(url, parameters);
                url = parameterService.getUrl();
            }
            const response = await this.getResponse(endpoint.method, data, url);
            result = {
                data: response.data,
                isError: false,
            };
        } catch (error) {
            const { response } = error as any;
            if (response && response.data) {
                result = { data: response.data.detail, isError: true };
            }
        }
        return result;
    }
}

export default Service;
