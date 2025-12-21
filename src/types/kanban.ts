export type IKanbanTask = {
  id: string;
  name: string;
  status: string;
  priority: string;
  labels: string[];
  description?: string;
  attachments: string[];
  due: [Date | null, Date | null];
  client: {
    id: string;
    name: string;
    avatarUrl: string;
  };
  orderNumber:string;
  createdAt:Date;
  paymentMethod: string;
  branch: string;
  cash: number;
  source:string;
  type:string;
};

export type IKanbanColumn = {
  id: string;
  name: Date|string;
  taskIds: string[];
};

export type IKanban = {
  tasks: IKanbanTask[];
  columns: IKanbanColumn[];
};
