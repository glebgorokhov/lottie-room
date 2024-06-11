import { FeaturedAnimationsListResponseData } from "../../../types/featuredAnimations.ts";
import { getApiUrl } from "../utils/api.ts";

export default function useAPI() {
  const getFeaturedAnimations = async () => {
    return fetch(getApiUrl("v1/featuredAnimations"), {
      method: "GET",
    }).then((res) =>
      res.json()
    ) as unknown as FeaturedAnimationsListResponseData;
  };

  return {
    getFeaturedAnimations,
  };
}
