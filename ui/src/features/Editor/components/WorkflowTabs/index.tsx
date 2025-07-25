import { memo } from "react";

import { ScrollArea } from "@flow/components";
import { useT } from "@flow/lib/i18n";
import { Workflow } from "@flow/types";

import WorkflowTab from "./WorkflowTab";

type Props = {
  currentWorkflowId: string;
  openWorkflows: {
    id: string;
    name: string;
  }[];
  onWorkflowClose: (workflowId: string) => void;
  onWorkflowChange: (workflowId?: string) => void;
};

const WorkflowTabs: React.FC<Props> = ({
  currentWorkflowId,
  openWorkflows,
  onWorkflowClose,
  onWorkflowChange,
}) => {
  const t = useT();

  const mainWorkflow = openWorkflows?.[0];

  const subWorkflows: Workflow[] | undefined = openWorkflows?.slice(1);

  const handleWorkflowClose =
    (workflowId: string) =>
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
      onWorkflowClose(workflowId);
    };

  return (
    <div className="flex h-full w-full flex-1 items-end gap-1 overflow-hidden">
      <div
        className={`group flex h-4/5 w-[135px] shrink-0 cursor-pointer items-center justify-center rounded-t px-[6px]  ${currentWorkflowId === mainWorkflow?.id ? "bg-card" : "bg-card/70 hover:bg-card"}`}
        onClick={() => onWorkflowChange(mainWorkflow?.id)}>
        <p
          className={`truncate text-center text-xs select-none group-hover:text-white dark:font-extralight ${currentWorkflowId !== mainWorkflow?.id && "text-accent-foreground"}`}>
          {t("Main Workflow")}
        </p>
      </div>
      <ScrollArea className="h-full flex-1">
        <div className="flex h-full items-end gap-1 overflow-auto">
          {subWorkflows &&
            subWorkflows.length > 0 &&
            subWorkflows.map((sw) => (
              <WorkflowTab
                currentWorkflowId={currentWorkflowId}
                id={sw.id}
                key={sw.id}
                name={sw.name}
                onWorkflowChange={onWorkflowChange}
                onWorkflowClose={handleWorkflowClose}
              />
            ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default memo(WorkflowTabs);
