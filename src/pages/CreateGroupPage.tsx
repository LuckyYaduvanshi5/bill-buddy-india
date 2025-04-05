
import { AppLayout } from "@/components/layout/app-layout";
import { PageHeader } from "@/components/header/page-header";
import { CreateGroupForm } from "@/components/groups/create-group-form";

const CreateGroupPage = () => {
  return (
    <AppLayout>
      <PageHeader title="Create Group" backLink="/groups" />
      <div className="p-4">
        <CreateGroupForm />
      </div>
    </AppLayout>
  );
};

export default CreateGroupPage;
