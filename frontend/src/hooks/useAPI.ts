import { Animation } from "@lottiefiles/lottie-types";

import { FeaturedAnimationsListResponseData } from "../../../types/featuredAnimations.ts";
import type { Playground } from "../types";
import { getApiUrl } from "../utils/api.ts";

export default function useAPI() {
  const getFeaturedAnimations = async ({
    pageParam,
  }: {
    pageParam: string;
  }) => {
    const url = new URL(getApiUrl("v1/featuredAnimations"));

    if (pageParam) {
      url.searchParams.set("cursor", pageParam);
    }

    const response = await fetch(url.toString(), {
      method: "GET",
    });

    return (await response.json()) as FeaturedAnimationsListResponseData;
  };

  const openPlaygroundForData = async (data: Animation) => {
    const response = await fetch(getApiUrl("v1/playground/create"), {
      method: "POST",
      body: JSON.stringify(data),
    });

    return await response.text();
  };

  const getPlaygroundById = async (id: string) => {
    const response = await fetch(getApiUrl(`v1/playground/${id}`), {
      method: "GET",
    });

    const playground: Playground = await response.json();

    return playground;
  };

  return {
    getFeaturedAnimations,
    openPlaygroundForData,
    getPlaygroundById,
  };
}
