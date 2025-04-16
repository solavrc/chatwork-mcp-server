import { z } from 'zod';

export const listMyTasksParamsSchema = z.object({
  query: z.object({
    assigned_by_account_id: z.number(),
    status: z.union([z.literal('open'), z.literal('done')]),
  }),
});

export const createRoomParamsSchema = z.object({
  name: z.string().describe('チャットルームの名前'),
  description: z.string().optional().describe('チャットルームの説明'),
  link: z.boolean().optional().describe('招待リンクを作成するかどうか'),
  link_code: z.string().optional().describe('招待リンクのコード'),
  link_need_acceptance: z.boolean().optional().describe('招待リンクの承認が必要かどうか'),
  members_admin_ids: z.string().describe('管理者メンバーのIDリスト（カンマ区切り）'),
  members_member_ids: z.string().optional().describe('一般メンバーのIDリスト（カンマ区切り）'),
  members_readonly_ids: z.string().optional().describe('閲覧専用メンバーのIDリスト（カンマ区切り）'),
  icon_preset: z.string().optional().describe('アイコンプリセット'),
});

export const getRoomParamsSchema = z.object({
  path: z.object({
    room_id: z.number(),
  }),
});

export const updateRoomParamsSchema = z.object({
  path: z.object({
    room_id: z.number(),
  }),
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    icon_preset: z.string().optional(),
  }),
});

export const deleteOrLeaveRoomParamsSchema = z.object({
  path: z.object({
    room_id: z.number(),
  }),
  body: z.object({
    action_type: z.union([z.literal('leave'), z.literal('delete')]),
  }),
});

export const listRoomMembersParamsSchema = z.object({
  path: z.object({
    room_id: z.number(),
  }),
});

export const updateRoomMembersParamsSchema = z.object({
  path: z.object({
    room_id: z.number(),
  }),
  body: z.object({
    members_admin_ids: z.string(),
    members_member_ids: z.string().optional(),
    members_readonly_ids: z.string().optional(),
  }),
});

export const listRoomMessagesParamsSchema = z.object({
  room_id: z.number().describe('チャットルームのID'),
  force: z.boolean().optional().describe('強制的に取得するかどうか'),
});

export const postRoomMessageParamsSchema = z.object({
  room_id: z.number().describe('チャットルームのID'),
  body: z.string().describe('メッセージの本文'),
  self_unread: z.boolean().optional().describe('自分が未読としてマークするかどうか'),
});

export const readRoomMessagesParamsSchema = z.object({
  path: z.object({
    room_id: z.number(),
  }),
  body: z.object({
    message_id: z.string(),
  }),
});

export const unreadRoomMessageParamsSchema = z.object({
  path: z.object({
    room_id: z.number(),
  }),
  body: z.object({
    message_id: z.string(),
  }),
});

export const getRoomMessageParamsSchema = z.object({
  path: z.object({
    room_id: z.number(),
    message_id: z.string(),
  }),
});

export const updateRoomMessageParamsSchema = z.object({
  path: z.object({
    room_id: z.number(),
    message_id: z.string(),
  }),
  body: z.object({
    body: z.string(),
  }),
});

export const deleteRoomMessageParamsSchema = z.object({
  path: z.object({
    room_id: z.number(),
    message_id: z.string(),
  }),
});

export const listRoomTasksParamsSchema = z.object({
  path: z.object({
    room_id: z.number(),
  }),
  query: z.object({
    account_id: z.number().optional(),
    assigned_by_account_id: z.number().optional(),
    status: z.union([z.literal('open'), z.literal('done')]).optional(),
  }),
});

export const createRoomTaskParamsSchema = z.object({
  path: z.object({
    room_id: z.number(),
  }),
  body: z.object({
    body: z.string(),
    to_ids: z.string(),
    limit: z.number().optional(),
    limit_type: z
      .union([z.literal('none'), z.literal('date'), z.literal('time')])
      .optional(),
  }),
});

export const getRoomTaskParamsSchema = z.object({
  path: z.object({
    room_id: z.number(),
    task_id: z.number(),
  }),
});

export const updateRoomTasksStatusParamsSchema = z.object({
  path: z.object({
    room_id: z.number(),
    task_id: z.number(),
  }),
  body: z.object({
    body: z.union([z.literal('open'), z.literal('done')]),
  }),
});

export const listRoomFilesParamsSchema = z.object({
  path: z.object({
    room_id: z.number(),
  }),
  query: z.object({
    account_id: z.number().optional(),
  }),
});

export const getRoomFileParamsSchema = z.object({
  room_id: z.number().describe('チャットルームのID'),
  file_id: z.number().describe('ファイルのID'),
  create_download_url: z.boolean().optional().describe('ダウンロードURLを作成するかどうか'),
});

export const getRoomLinkParamsSchema = z.object({
  path: z.object({
    room_id: z.number(),
  }),
});

export const createRoomLinkParamsSchema = z.object({
  room_id: z.number().describe('チャットルームのID'),
  code: z.string().optional().describe('招待リンクのコード'),
  need_acceptance: z.boolean().optional().describe('招待リンクの承認が必要かどうか'),
  description: z.string().optional().describe('招待リンクの説明'),
});

export const updateRoomLinkParamsSchema = z.object({
  room_id: z.number().describe('チャットルームのID'),
  code: z.string().optional().describe('招待リンクのコード'),
  need_acceptance: z.boolean().optional().describe('招待リンクの承認が必要かどうか'),
  description: z.string().optional().describe('招待リンクの説明'),
});

export const deleteRoomLinkParamsSchema = z.object({
  path: z.object({
    room_id: z.number(),
  }),
});

export const acceptIncomingRequestParamsSchema = z.object({
  path: z.object({
    request_id: z.number(),
  }),
});

export const rejectIncomingRequestParamsSchema = z.object({
  path: z.object({
    request_id: z.number(),
  }),
});
