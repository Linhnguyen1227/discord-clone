import { InitialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
// import dynamic from "next/dynamic";
import InitialModal from "@/components/modal/initial-modal";

// const InitialModal = dynamic(() => import("@/components/modal/initial-modal"), {
//   ssr: false,
// });
const SetupPage = async () => {


  const profile = await InitialProfile();
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  if (server) {
    redirect(`/servers/${server.id}`);
  }
  return <InitialModal />;
};

export default SetupPage;
