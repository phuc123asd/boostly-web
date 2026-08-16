export const BG_IMAGE_1 = "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260713_140344_79e1296a-86d7-43fd-9b5f-63ffe560f291.png&w=1280&q=85";
export const FRONT_VIDEO = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260713_162101_0d7498c5-29bb-47bf-a99f-2773c0a880a9.mp4";
export const OVERLAY_IMAGE = "https://soft-zoom-63098134.figma.site/_assets/v11/3f10f1876e118f72a396e05a6c2d099569478272.png";

export const ZALO_PHONE = "0325116160";
export const ZALO_LINK = "https://zalo.me/0325116160";
export const SUPPORT_EMAIL = "support@boostly.vn";

export const PLATFORMS = [
  { id: 'facebook', name: 'Facebook', color: '#1877F2' },
  { id: 'tiktok', name: 'TikTok', color: '#FE2C55' },
  { id: 'instagram', name: 'Instagram', color: '#E4405F' },
  { id: 'youtube', name: 'YouTube', color: '#FF0000' }
];

export const SERVICES = {
  facebook: [
    { id: "fb-like", name: "Facebook Like", minPrice: 20, maxPrice: 30, sellingPrice: 25, unit: "like" },
    { id: "fb-follow", name: "Facebook Follow", minPrice: 20, maxPrice: 60, sellingPrice: 40, unit: "follow" },
    { id: "fb-comment", name: "Facebook Comment", minPrice: 400, maxPrice: 600, sellingPrice: 500, unit: "comment" },
    { id: "fb-share", name: "Facebook Share", minPrice: 400, maxPrice: 500, sellingPrice: 450, unit: "share" }
  ],
  tiktok: [
    { id: "tt-like", name: "TikTok Like", minPrice: 5, maxPrice: 13, sellingPrice: 10, unit: "like" },
    { id: "tt-follow", name: "TikTok Follow", minPrice: 26, maxPrice: 80, sellingPrice: 50, unit: "follow" },
    { id: "tt-view", name: "TikTok View", minPrice: 4, maxPrice: 4, sellingPrice: 4, unit: "view" },
    { id: "tt-comment", name: "TikTok Comment", minPrice: 680, maxPrice: 1600, sellingPrice: 1000, unit: "comment" }
  ],
  instagram: [
    { id: "ig-like", name: "Instagram Like", minPrice: 5, maxPrice: 20, sellingPrice: 12, unit: "like" },
    { id: "ig-follow", name: "Instagram Follow", minPrice: 50, maxPrice: 120, sellingPrice: 80, unit: "follow" }
  ],
  youtube: [
    { id: "yt-like", name: "YouTube Like", minPrice: 100, maxPrice: 100, sellingPrice: 100, unit: "like" },
    { id: "yt-subscriber", name: "YouTube Subscriber", minPrice: 350, maxPrice: 350, sellingPrice: 350, unit: "sub" }
  ]
};

export function formatVND(amount) {
  return new Intl.NumberFormat("vi-VN").format(Math.round(amount || 0)) + "đ";
}
