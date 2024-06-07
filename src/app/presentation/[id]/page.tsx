"use client";
import { fetchPresentationById, fetchPresentationPages } from "./action";
import { PageProps } from "../../../../.next/types/app/layout";
import { useEffect } from "react";
import { usePresentation } from "@/store/PresentationContext";
import { PresentationEditor } from "../components/PresentationEditor";

export default function Presentation({ params }: PageProps) {
  const { state, dispatch } = usePresentation();

  useEffect(() => {
    const fetchData = async () => {
      const [presentation, pages] = await Promise.all([
        fetchPresentationById(params.id),
        fetchPresentationPages(params.id),
      ]);

      dispatch({ type: "SET_PRESENTATION", payload: presentation });
      dispatch({ type: "SET_PAGES", payload: pages });
    };
    fetchData();
  }, [params.id]);

  return (
    <main className="p-12">
      <h1>{state.presentation?.title}</h1>
      <PresentationEditor />
    </main>
  );
}
