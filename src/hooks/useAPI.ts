import type { APIResult } from '@/types/api-result.ts'
import { axiosInstance } from '@/util/axios.ts'
import type {  AxiosResponse } from 'axios'
import { type Ref, ref } from 'vue'

export const useUnauthenticatedAPI = <T>(
  url: string,
  method: 'post' | 'delete' | 'put',
  expectedCode: number = 200
): { isLoading: Ref<boolean>, execute: ((body: object) => Promise<APIResult<T>>) } => {
  const isLoading = ref<boolean>(false)


  const execute =  async (body: object): Promise<APIResult<T>> => {
    isLoading.value = true
    try {
      let response: AxiosResponse

      console.log(body)

      if (method === 'post') {
        response = await axiosInstance.post(url, body)
      } else if (method === 'put') {
        response = await axiosInstance.put(url, body)
      } else {
        response = await axiosInstance.delete(url, { data: body })
      }

      const result = response

      if (result.status === 400) {
        return { status: false, code: 400, message: 'The request failed', fields: [] }
      }

      if (result.status === 422) {
        return { status: false, code: 422, message: 'The request failed', fields: result.data.fields }
      }

      if (result.status !== expectedCode) {
        return { status: false, code: expectedCode, message: 'The code did not match the expected code', fields: [] }
      }

      return {
        status: true,
        code: result.status,
        message: 'The request finished successfully',
        fields: [],
        data: result.data,
      }
    } catch {
      return {
        status: false,
        code: -1,
        message: 'The request failed',
        fields: [],
      }
    } finally {
      isLoading.value = false
    }
  }

  return { isLoading, execute }
}
