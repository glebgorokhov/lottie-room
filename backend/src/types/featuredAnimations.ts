export type FeaturedAnimation = {
  "id": number,
  "gifUrl": null | string,
  "name": string,
  "likesCount": number,
  "url": string,
  "lottieUrl": string
  jsonUrl: string
  createdBy: {
    username: string
    avatarUrl: string
    firstName: string | null
    lastName: string | null
  },
}

export type FeaturedAnimationsListResponseData = {
  nextCursor: string,
  animations: FeaturedAnimation[],
}
