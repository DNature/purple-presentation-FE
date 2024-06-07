"use server";

import { customFetch } from "@/utils/custom-fetch";

export async function fetchPresentationById(id: string) {
  const response = await customFetch(`/presentation/${id}`, { method: "GET" });

  return response;
}

export async function fetchPresentationPages(id: string) {
  const response = await customFetch(`/page?presentationId=${id}`, {
    method: "GET",
  });

  return response;
}

export async function saveContent(data: any) {
  delete data.id;
  const response = await customFetch(`/content`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  return response;
}

export async function deleteContent(id: string) {
  await fetch(`${process.env.BE_URL}/content/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function addPage(data: any) {
  const response = await customFetch(`/page`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  return response;
}

export async function deletePage(id: string) {
  await fetch(`${process.env.BE_URL}/page/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
