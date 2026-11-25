export interface Notification {
  id: string;
  userId: string;
  title: string;
  body: string;
  type: string;
  data?: Record<string, unknown> | null;
  isRead: boolean;
  createdAt: Date | string;
}
