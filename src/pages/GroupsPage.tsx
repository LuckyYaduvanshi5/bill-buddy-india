
import { AppLayout } from "@/components/layout/app-layout";
import { PageHeader } from "@/components/header/page-header";
import { GroupCard } from "@/components/groups/group-card";
import { mockGroups } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Search, Plus, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const GroupsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  const filteredGroups = mockGroups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <AppLayout>
      <PageHeader title="Groups" />
      
      <div className="p-4">
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search groups"
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button 
            size="icon" 
            variant="outline" 
            onClick={() => navigate("/filters")}
          >
            <Filter className="h-4 w-4" />
          </Button>
          <Button 
            size="icon" 
            onClick={() => navigate("/create-group")}
            className="bg-brand-blue hover:bg-brand-blue/90"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        {filteredGroups.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredGroups.map(group => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <h3 className="text-lg font-semibold mb-2">No groups found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery ? "Try a different search term" : "You haven't created any groups yet"}
            </p>
            <Button 
              onClick={() => navigate("/create-group")}
              className="bg-brand-blue hover:bg-brand-blue/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create a Group
            </Button>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default GroupsPage;
