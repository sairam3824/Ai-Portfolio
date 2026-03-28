import { useEffect } from "react";
import { SEO } from "@/shared/components";
import { codingProfilesData } from "@/data/codingProfilesData";
import { profileDetails } from "@/data/siteMetadata";

const codolioProfile = codingProfilesData.find((profile) => profile.label === "Codolio");

const CodingRedirect = () => {
  useEffect(() => {
    window.location.href = codolioProfile?.href ?? "/";
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <SEO
        title={`Coding Profiles Redirect | ${profileDetails.name}`}
        description={`Redirecting to ${profileDetails.name}'s coding profile.`}
        canonicalPath="/coding"
        robots="noindex,follow"
      />
      <div className="text-center">
        <p className="text-lg">Redirecting to Codolio profile...</p>
        <p className="text-lg">This is not much accurate</p>
      </div>
    </div>
  );
};

export default CodingRedirect;
