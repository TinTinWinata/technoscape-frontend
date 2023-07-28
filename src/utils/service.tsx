import type { AxiosInstance, AxiosRequestConfig } from "axios";
import axios from "axios";

import { IBackendInterface } from "../interfaces/backend/backend-response-interface";
import { Endpoint, Method } from "../settings/endpoint";
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
    ): Promise<IBackendInterface<T>> {
        let url = `${endpoint.url}/${id}`;
        if (parameters.length > 0) {
            const parameterService = new Parameter(url, parameters);
            url = parameterService.getUrl();
        }
        try {
            return (await this.getResponse(
                endpoint.method,
                data,
                url
            )) as IBackendInterface<T>;
        } catch (err) {
            const { response } = err as any;
            return {
                data: undefined,
                errorMessage: response.data
                    ? response.data.errorMessage
                    : "Error Please contact Blue Jacket Team.",
                success: false,
            } as IBackendInterface<T>;
        }
    }
}

export default Service;
