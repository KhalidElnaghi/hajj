import { IKanban } from 'src/types/kanban';
// Dummy data
const inProgressOrders: IKanban = {
  tasks: [
    {
      id: 'task1',
      name: 'Task 1',
      status: 'Completed',
      priority: 'High',
      labels: ['Label 1', 'Label 2'],
      description: 'This is a description for Task 1',
      attachments: ['attachment1.jpg', 'attachment2.pdf'],
      due: [new Date(), null],
      client: { id: '1', name: 'Client 1', avatarUrl: 'https://example.com/avatar1.jpg' },
      orderNumber: '123456789',
      createdAt: new Date(),
      paymentMethod: 'Credit Card',
      branch: 'branch',
      cash: 200,
      source:'Al hamdi',
      type:'Delivary'
    },
    {
      id: 'task3',
      name: 'Task 3',
      status: 'Ready',
      priority: 'High',
      labels: ['Label 1', 'Label 2'],
      description: 'This is a description for Task 1',
      attachments: ['attachment1.jpg', 'attachment2.pdf'],
      due: [new Date(), null],
      client: { id: '1', name: 'Client 1', avatarUrl: 'https://example.com/avatar1.jpg' },
      orderNumber: '123456789',
      createdAt: new Date(),
      paymentMethod: 'Credit Card',
      branch: 'branch',
      cash: 200,
      source:'Al hamdi',
      type:'Delivary'
    },
    {
      id: 'task2',
      name: 'Task 2',
      status: 'Preparing',
      priority: 'Medium',
      labels: ['Label 3'],
      description: 'This is a description for Task 2',
      attachments: ['attachment3.jpg'],
      due: [new Date(), new Date('2024-04-15')],
      client: { id: '1', name: 'Client 2', avatarUrl: 'https://example.com/avatar2.jpg' },
      orderNumber: '123456789',
      createdAt: new Date(),
      paymentMethod: 'Credit Card',
      branch: 'branch',
      cash: 200,
      source:'Al hamdi',
      type:'Delivary'
    },
    // Add more tasks as needed
  ],
  columns: [
    { id: '14', name: new Date('2024-04-15'), taskIds: ['task1','task2','task3'] },
    { id: '12', name: new Date('2024-04-16'), taskIds: ['task2'] },
    { id: '15', name: new Date('2024-04-17'), taskIds: ['task3'] },
    { id: '15', name: new Date('2024-04-17'), taskIds: ['task3'] },
    { id: '15', name: new Date('2024-04-17'), taskIds: ['task3'] },
  ],
};



export default inProgressOrders;

export const orderStatus: IKanban = {
  tasks: [
    {
      id: 'task1',
      name: 'Task 1',
      status: 'Completed',
      priority: 'High',
      labels: ['Label 1', 'Label 2'],
      description: 'This is a description for Task 1',
      attachments: ['attachment1.jpg', 'attachment2.pdf'],
      due: [new Date(), null],
      client: { id: '1', name: 'Client 1', avatarUrl: 'https://example.com/avatar1.jpg' },
      orderNumber: '123456789',
      createdAt: new Date(),
      paymentMethod: 'Credit Card',
      branch: 'branch',
      cash: 200,
      source:'Al hamdi',
      type:'Delivary'
    },
    {
      id: 'task3',
      name: 'Task 3',
      status: 'Ready',
      priority: 'High',
      labels: ['Label 1', 'Label 2'],
      description: 'This is a description for Task 1',
      attachments: ['attachment1.jpg', 'attachment2.pdf'],
      due: [new Date(), null],
      client: { id: '1', name: 'Client 1', avatarUrl: 'https://example.com/avatar1.jpg' },
      orderNumber: '123456789',
      createdAt: new Date(),
      paymentMethod: 'Credit Card',
      branch: 'branch',
      cash: 200,
      source:'Al hamdi',
      type:'Delivary'
    },
    {
      id: 'task2',
      name: 'Task 2',
      status: 'Preparing',
      priority: 'Medium',
      labels: ['Label 3'],
      description: 'This is a description for Task 2',
      attachments: ['attachment3.jpg'],
      due: [new Date(), new Date('2024-04-15')],
      client: { id: '1', name: 'Client 2', avatarUrl: 'https://example.com/avatar2.jpg' },
      orderNumber: '123456789',
      createdAt: new Date(),
      paymentMethod: 'Credit Card',
      branch: 'branch',
      cash: 200,
      source:'Al hamdi',
      type:'Delivary'
    },
    // Add more tasks as needed
  ],
  columns: [
    { id: '14', name: "New", taskIds: [] },
    { id: '12', name: "In Progress", taskIds: ['task2'] },
    { id: '15', name: "Delivered", taskIds: ['task1'] },
    // Add more columns as needed
  ],
};