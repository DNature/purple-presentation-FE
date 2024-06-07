"use server";

import { customFetch } from "@/utils/custom-fetch";

export async function fetchPresentations() {
  const response = await customFetch(`/presentation`, { method: "GET" });

  return response;
}

export async function addPresentation(formData: FormData) {
  const data = {
    title: formData.get("title"),
  };
  const response = await customFetch(`/presentation`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  return response;
}

export async function deletePresentation(id: string) {
  const response = await customFetch(`/presentation/${id}`, {
    method: "DELETE",
  });

  return response;
}
