
import { AppLayout } from "@/components/layout/app-layout";
import { PageHeader } from "@/components/header/page-header";
import { AddExpenseForm } from "@/components/expenses/add-expense-form";
import { useSearchParams } from "react-router-dom";

const AddExpensePage = () => {
  const [searchParams] = useSearchParams();
  const groupId = searchParams.get("groupId") || undefined;
  
  return (
    <AppLayout>
      <PageHeader title="Add Expense" backLink="/" />
      <div className="p-4">
        <AddExpenseForm groupId={groupId} />
      </div>
    </AppLayout>
  );
};

export default AddExpensePage;
