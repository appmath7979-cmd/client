type MessageType = { message: string };
type DetailListType = {
  total: number;
  page: number;
  totalPage: number;
};
type MessageInputType = MessageType & { status: "success" | "error" };

export type { MessageType, DetailListType, MessageInputType };
