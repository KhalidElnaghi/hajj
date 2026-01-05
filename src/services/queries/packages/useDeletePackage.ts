'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import API from '../../shared/functions/axios';

export interface DeletePackageResponse {
  success: boolean;
  message: string;
  data: null;
}

const deletePackage = async (id: number): Promise<DeletePackageResponse> => {
  try {
    const response = await API.delete<DeletePackageResponse>(`/packages/${id}`);
    return response;
  } catch (error: any) {
    console.error('Delete Package API error:', {
      message: error?.message,
      status: error?.response?.status,
      statusText: error?.response?.statusText,
      data: error?.response?.data,
      url: error?.config?.url,
      method: error?.config?.method,
    });
    throw error;
  }
};

export const useDeletePackage = () => {
  const queryClient = useQueryClient();

  return useMutation<DeletePackageResponse, Error, number>({
    mutationFn: (id: number) => deletePackage(id),
    onSuccess: () => {
      // Invalidate and refetch packages list
      queryClient.invalidateQueries({ queryKey: ['packages'] });
    },
  });
};

