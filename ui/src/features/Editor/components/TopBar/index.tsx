import { ChalkboardTeacherIcon, HardDriveIcon } from "@phosphor-icons/react";
import { memo } from "react";
import { Doc } from "yjs";

import { IconButton } from "@flow/components";
import { useT } from "@flow/lib/i18n";
import { useCurrentProject } from "@flow/stores";
import { Project } from "@flow/types";

import { WorkflowTabs } from "..";

import {
  ActionBar,
  Breadcrumb,
  DebugActionBar,
  HomeMenu,
  AssetsDialog,
  ProjectVariableDialog,
} from "./components";
import useHooks from "./hooks";

type Props = {
  currentWorkflowId: string;
  openWorkflows: {
    id: string;
    name: string;
  }[];
  project?: Project;
  yDoc: Doc | null;
  allowedToDeploy: boolean;
  onWorkflowDeployment: (
    description: string,
    deploymentId?: string,
  ) => Promise<void>;
  onProjectExport: () => void;
  onProjectShare: (share: boolean) => void;
  onDebugRunStart: () => Promise<void>;
  onDebugRunStop: () => Promise<void>;
  onWorkflowClose: (workflowId: string) => void;
  onWorkflowChange: (workflowId?: string) => void;
};

const TopBar: React.FC<Props> = ({
  currentWorkflowId,
  openWorkflows,
  project,
  yDoc,
  allowedToDeploy,
  onWorkflowDeployment,
  onProjectExport,
  onProjectShare,
  onDebugRunStart,
  onDebugRunStop,
  onWorkflowClose,
  onWorkflowChange,
}) => {
  const t = useT();
  const {
    showDialog,
    currentProjectVariables,
    handleProjectVariableAdd,
    handleProjectVariableChange,
    handleProjectVariablesBatchUpdate,
    handleProjectVariableDelete,
    handleProjectVariablesBatchDelete,
    handleDialogOpen,
    handleDialogClose,
  } = useHooks();
  const [currentProject] = useCurrentProject();

  return (
    <div className="flex w-[100vw] shrink-0 justify-between gap-2 bg-secondary">
      <div className="flex items-center gap-1">
        <HomeMenu
          dropdownPosition="bottom"
          dropdownAlign="end"
          dropdownAlignOffset={-140}
        />
        <div className="pr-4 pl-2">
          <Breadcrumb />
        </div>
        <div className="flex items-center gap-2 rounded-md p-1">
          <IconButton
            className="h-[30px]"
            variant="outline"
            tooltipText={t("Project Variables")}
            icon={<ChalkboardTeacherIcon weight="thin" size={18} />}
            onClick={() => handleDialogOpen("projectVariables")}
          />
          <IconButton
            className="h-[30px]"
            variant="outline"
            tooltipText={t("Assets")}
            icon={<HardDriveIcon weight="thin" size={18} />}
            onClick={() => handleDialogOpen("assets")}
          />
        </div>
      </div>
      <div className="flex h-full flex-1 gap-2 overflow-hidden">
        <WorkflowTabs
          currentWorkflowId={currentWorkflowId}
          openWorkflows={openWorkflows}
          onWorkflowClose={onWorkflowClose}
          onWorkflowChange={onWorkflowChange}
        />
      </div>
      <div className="flex h-full items-center justify-center gap-2 self-center p-1 select-none">
        <div className="h-4/5 border-r" />
        <DebugActionBar
          onDebugRunStart={onDebugRunStart}
          onDebugRunStop={onDebugRunStop}
        />
        <div className="h-4/5 border-r" />
        <ActionBar
          project={project}
          yDoc={yDoc}
          allowedToDeploy={allowedToDeploy}
          showDialog={showDialog}
          onProjectShare={onProjectShare}
          onProjectExport={onProjectExport}
          onWorkflowDeployment={onWorkflowDeployment}
          onDialogOpen={handleDialogOpen}
          onDialogClose={handleDialogClose}
        />
      </div>
      {showDialog === "assets" && (
        <AssetsDialog onDialogClose={handleDialogClose} />
      )}
      {showDialog === "projectVariables" && (
        <ProjectVariableDialog
          isOpen={showDialog === "projectVariables"}
          currentProjectVariables={currentProjectVariables}
          projectId={currentProject?.id}
          onClose={handleDialogClose}
          onAdd={handleProjectVariableAdd}
          onChange={handleProjectVariableChange}
          onDelete={handleProjectVariableDelete}
          onDeleteBatch={handleProjectVariablesBatchDelete}
          onBatchUpdate={handleProjectVariablesBatchUpdate}
        />
      )}
    </div>
  );
};

export default memo(TopBar);
