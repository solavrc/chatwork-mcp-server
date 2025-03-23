import { z } from 'zod';

export const listMyTasksParamsSchema = z.object({
  query: z.object({
    assigned_by_account_id: z.number(),
    status: z.union([z.literal('open'), z.literal('done')]),
  }),
});

export const createRoomParamsSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string().optional(),
    link: z.union([z.literal(0), z.literal(1)]).optional(),
    link_code: z.string().optional(),
    link_need_acceptance: z.union([z.literal(0), z.literal(1)]).optional(),
    members_admin_ids: z.string(),
    members_member_ids: z.string().optional(),
    members_readonly_ids: z.string().optional(),
    icon_preset: z.string().optional(),
  }),
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
  path: z.object({
    room_id: z.number(),
  }),
  query: z.object({
    force: z.union([z.literal(0), z.literal(1)]).optional(),
  }),
});

export const postRoomMessageParamsSchema = z.object({
  path: z.object({
    room_id: z.number(),
  }),
  body: z.object({
    body: z.string(),
    self_unread: z.union([z.literal(0), z.literal(1)]).optional(),
  }),
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
  path: z.object({
    room_id: z.number(),
    file_id: z.number(),
  }),
  query: z.object({
    create_download_url: z.union([z.literal(0), z.literal(1)]).optional(),
  }),
});

export const getRoomLinkParamsSchema = z.object({
  path: z.object({
    room_id: z.number(),
  }),
});

export const createRoomLinkParamsSchema = z.object({
  path: z.object({
    room_id: z.number(),
  }),
  body: z.object({
    code: z.string().optional(),
    need_acceptance: z.union([z.literal(0), z.literal(1)]).optional(),
    description: z.string().optional(),
  }),
});

export const updateRoomLinkParamsSchema = z.object({
  path: z.object({
    room_id: z.number(),
  }),
  body: z.object({
    code: z.string().optional(),
    need_acceptance: z.union([z.literal(0), z.literal(1)]).optional(),
    description: z.string().optional(),
  }),
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
