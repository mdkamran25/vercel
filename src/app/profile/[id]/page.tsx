import DashboardHeader from "@/components/dashboardHeader/dashboardHeader";
import { getProfileResult, user } from "@/constants/apiUrl";
import ProfileModal from "@/modals/profileModal";
import { Session, getServerSession } from "next-auth";
import Table from "@/components/table/table";
import { redirect } from "next/navigation";
const ProfilePage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const session: Session | null = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  const res = await fetch(`${user}/${session?.user?.email}`);
  const resData = (await res.json()) as UserResponseData;

  const result = await fetch(`${getProfileResult}/${id}`);
  const resultData = await result.json();

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="w-screen px-3 md:px-8 mt-3 md:mt-5 flex flex-row">
        <DashboardHeader headerMessage={resData?.data?.name} />
        <div className="ms-auto">
          <ProfileModal
            userName={session?.user?.name}
            userId={resData.data?._id}
          />
        </div>
      </div>
      <div className="w-[100vw] flex justify-center items-center h-[100%]">
        <Table result={resultData?.matchData} />
        
      </div>
    </div>
  );
};

export default ProfilePage;
