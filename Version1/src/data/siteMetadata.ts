import {
  profileDetails as sharedProfileDetails,
  siteMetadata,
} from "../../../shared-data/siteMetadata";

const withBase = (assetPath: string) =>
  `${import.meta.env.BASE_URL}${assetPath.replace(/^\/+/, "")}`;

export const profileDetails = {
  ...sharedProfileDetails,
  resumeHref: withBase(sharedProfileDetails.resumeHref),
};

export { siteMetadata };
