import { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { chatworkClient, ChatworkClientResponse } from './chatworkClient';
import {
  acceptIncomingRequestParamsSchema,
  createRoomLinkParamsSchema,
  createRoomParamsSchema,
  createRoomTaskParamsSchema,
  deleteOrLeaveRoomParamsSchema,
  deleteRoomLinkParamsSchema,
  deleteRoomMessageParamsSchema,
  getRoomFileParamsSchema,
  getRoomLinkParamsSchema,
  getRoomMessageParamsSchema,
  getRoomParamsSchema,
  getRoomTaskParamsSchema,
  listMyTasksParamsSchema,
  listRoomFilesParamsSchema,
  listRoomMembersParamsSchema,
  listRoomMessagesParamsSchema,
  listRoomTasksParamsSchema,
  postRoomMessageParamsSchema,
  readRoomMessagesParamsSchema,
  rejectIncomingRequestParamsSchema,
  unreadRoomMessageParamsSchema,
  updateRoomLinkParamsSchema,
  updateRoomMembersParamsSchema,
  updateRoomMessageParamsSchema,
  updateRoomParamsSchema,
  updateRoomTasksStatusParamsSchema,
} from './schema';
import { z } from 'zod';

function chatworkClientResponseToCallToolResult(
  res: ChatworkClientResponse,
): CallToolResult {
  if (!res.ok) {
    return {
      isError: true,
      content: [
        {
          type: 'text',
          text: `Error: status code ${res.status}`,
        },
        {
          type: 'resource',
          resource: {
            uri: res.uri,
            text: res.response,
          },
        },
      ],
    };
  }

  return {
    content: [
      {
        type: 'resource',
        resource: {
          uri: res.uri,
          text: res.response,
        },
      },
    ],
  };
}

export const getMe = () =>
  chatworkClient()
    .request({
      path: '/me',
      method: 'GET',
      query: {},
      body: {},
    })
    .then(chatworkClientResponseToCallToolResult);

export const getMyStatus = () =>
  chatworkClient()
    .request({
      path: '/my/status',
      method: 'GET',
      query: {},
      body: {},
    })
    .then(chatworkClientResponseToCallToolResult);

export const listMyTasks = (req: z.infer<typeof listMyTasksParamsSchema>) =>
  chatworkClient()
    .request({
      path: '/my/tasks',
      method: 'GET',
      query: req.query,
      body: {},
    })
    .then(chatworkClientResponseToCallToolResult);

export const listContacts = () =>
  chatworkClient()
    .request({
      path: '/contacts',
      method: 'GET',
      query: {},
      body: {},
    })
    .then(chatworkClientResponseToCallToolResult);

// TODO: 2500文字という閾値は直感によるもの。適切な値を調査する必要がある。
/** レスポンス文字列が2500文字を超える場合プロパティを絞って返す */
const minifyListRoomsResponse = (
  res: ChatworkClientResponse,
): ChatworkClientResponse => {
  if (!res.ok || res.response.length < 2500) {
    return res;
  }

  const fullResponse: {
    room_id: number;
    name: string;
    type: string;
  }[] = JSON.parse(res.response);
  const minifiedResponse = fullResponse.map(({ room_id, name, type }) => ({
    room_id,
    name,
    type,
  }));
  return {
    ...res,
    response: JSON.stringify(minifiedResponse),
  };
};

export const listRooms = () =>
  chatworkClient()
    .request({
      path: '/rooms',
      method: 'GET',
      query: {},
      body: {},
    })
    .then(minifyListRoomsResponse)
    .then(chatworkClientResponseToCallToolResult);

export const createRoom = (req: z.infer<typeof createRoomParamsSchema>) =>
  chatworkClient()
    .request({
      path: '/rooms',
      method: 'POST',
      body: {
        name: req.name,
        description: req.description,
        link: req.link ? 1 : 0,
        link_code: req.link_code,
        link_need_acceptance: req.link_need_acceptance ? 1 : 0,
        members_admin_ids: req.members_admin_ids,
        members_member_ids: req.members_member_ids,
        members_readonly_ids: req.members_readonly_ids,
        icon_preset: req.icon_preset,
      },
      query: {},
    })
    .then(chatworkClientResponseToCallToolResult);

export const getRoom = (req: z.infer<typeof getRoomParamsSchema>) =>
  chatworkClient()
    .request({
      path: `/rooms/${req.path.room_id}`,
      method: 'GET',
      query: {},
      body: {},
    })
    .then(chatworkClientResponseToCallToolResult);

export const updateRoom = (req: z.infer<typeof updateRoomParamsSchema>) =>
  chatworkClient()
    .request({
      path: `/rooms/${req.path.room_id}`,
      method: 'PUT',
      query: {},
      body: req.body,
    })
    .then(chatworkClientResponseToCallToolResult);

export const deleteOrLeaveRoom = (
  req: z.infer<typeof deleteOrLeaveRoomParamsSchema>,
) =>
  chatworkClient()
    .request({
      path: `/rooms/${req.path.room_id}`,
      method: 'DELETE',
      query: {},
      body: req.body,
    })
    .then(chatworkClientResponseToCallToolResult);

export const listRoomMembers = (
  req: z.infer<typeof listRoomMembersParamsSchema>,
) =>
  chatworkClient()
    .request({
      path: `/rooms/${req.path.room_id}/members`,
      method: 'GET',
      query: {},
      body: {},
    })
    .then(chatworkClientResponseToCallToolResult);

export const updateRoomMembers = (
  req: z.infer<typeof updateRoomMembersParamsSchema>,
) =>
  chatworkClient()
    .request({
      path: `/rooms/${req.path.room_id}/members`,
      method: 'PUT',
      query: {},
      body: req.body,
    })
    .then(chatworkClientResponseToCallToolResult);

export const listRoomMessages = (
  req: z.infer<typeof listRoomMessagesParamsSchema>,
) =>
  chatworkClient()
    .request({
      path: `/rooms/${req.room_id}/messages`,
      method: 'GET',
      query: {
        force: req.force ? 1 : 0,
      },
      body: {},
    })
    .then(chatworkClientResponseToCallToolResult);

export const postRoomMessage = (
  req: z.infer<typeof postRoomMessageParamsSchema>,
) =>
  chatworkClient()
    .request({
      path: `/rooms/${req.room_id}/messages`,
      method: 'POST',
      query: {},
      body: {
        body: req.body,
        self_unread: req.self_unread ? 1 : 0,
      },
    })
    .then(chatworkClientResponseToCallToolResult);

export const readRoomMessage = (
  req: z.infer<typeof readRoomMessagesParamsSchema>,
) =>
  chatworkClient()
    .request({
      path: `/rooms/${req.path.room_id}/messages/read`,
      method: 'PUT',
      query: {},
      body: req.body,
    })
    .then(chatworkClientResponseToCallToolResult);

export const unreadRoomMessage = (
  req: z.infer<typeof unreadRoomMessageParamsSchema>,
) =>
  chatworkClient()
    .request({
      path: `/rooms/${req.path.room_id}/messages/unread`,
      method: 'PUT',
      query: {},
      body: req.body,
    })
    .then(chatworkClientResponseToCallToolResult);

export const getRoomMessage = (
  req: z.infer<typeof getRoomMessageParamsSchema>,
) =>
  chatworkClient()
    .request({
      path: `/rooms/${req.path.room_id}/messages/${req.path.message_id}`,
      method: 'GET',
      query: {},
      body: {},
    })
    .then(chatworkClientResponseToCallToolResult);

export const updateRoomMessage = (
  req: z.infer<typeof updateRoomMessageParamsSchema>,
) =>
  chatworkClient()
    .request({
      path: `/rooms/${req.path.room_id}/messages/${req.path.message_id}`,
      method: 'PUT',
      query: {},
      body: req.body,
    })
    .then(chatworkClientResponseToCallToolResult);

export const deleteRoomMessage = (
  req: z.infer<typeof deleteRoomMessageParamsSchema>,
) =>
  chatworkClient()
    .request({
      path: `/rooms/${req.path.room_id}/messages/${req.path.message_id}`,
      method: 'DELETE',
      query: {},
      body: {},
    })
    .then(chatworkClientResponseToCallToolResult);

export const listRoomTasks = (req: z.infer<typeof listRoomTasksParamsSchema>) =>
  chatworkClient()
    .request({
      path: `/rooms/${req.path.room_id}/tasks`,
      method: 'GET',
      query: req.query,
      body: {},
    })
    .then(chatworkClientResponseToCallToolResult);

export const createRoomTask = (
  req: z.infer<typeof createRoomTaskParamsSchema>,
) =>
  chatworkClient()
    .request({
      path: `/rooms/${req.path.room_id}/tasks`,
      method: 'POST',
      query: {},
      body: req.body,
    })
    .then(chatworkClientResponseToCallToolResult);

export const getRoomTask = (req: z.infer<typeof getRoomTaskParamsSchema>) =>
  chatworkClient()
    .request({
      path: `/rooms/${req.path.room_id}/tasks/${req.path.task_id}`,
      method: 'GET',
      query: {},
      body: {},
    })
    .then(chatworkClientResponseToCallToolResult);

export const updateRoomTaskStatus = (
  req: z.infer<typeof updateRoomTasksStatusParamsSchema>,
) =>
  chatworkClient()
    .request({
      path: `/rooms/${req.path.room_id}/tasks/${req.path.task_id}/status`,
      method: 'PUT',
      query: {},
      body: req.body,
    })
    .then(chatworkClientResponseToCallToolResult);

export const listRoomFiles = (req: z.infer<typeof listRoomFilesParamsSchema>) =>
  chatworkClient()
    .request({
      path: `/rooms/${req.path.room_id}/files`,
      method: 'GET',
      query: {},
      body: {},
    })
    .then(chatworkClientResponseToCallToolResult);

export const getRoomFile = (req: z.infer<typeof getRoomFileParamsSchema>) =>
  chatworkClient()
    .request({
      path: `/rooms/${req.room_id}/files/${req.file_id}`,
      method: 'GET',
      query: {
        create_download_url: req.create_download_url ? 1 : 0,
      },
      body: {},
    })
    .then(chatworkClientResponseToCallToolResult);

export const getRoomLink = (req: z.infer<typeof getRoomLinkParamsSchema>) =>
  chatworkClient()
    .request({
      path: `/rooms/${req.path.room_id}/link`,
      method: 'GET',
      query: {},
      body: {},
    })
    .then(chatworkClientResponseToCallToolResult);

export const createRoomLink = (
  req: z.infer<typeof createRoomLinkParamsSchema>,
) =>
  chatworkClient()
    .request({
      path: `/rooms/${req.room_id}/link`,
      method: 'POST',
      query: {},
      body: {
        code: req.code,
        need_acceptance: req.need_acceptance ? 1 : 0,
        description: req.description,
      },
    })
    .then(chatworkClientResponseToCallToolResult);

export const updateRoomLink = (
  req: z.infer<typeof updateRoomLinkParamsSchema>,
) =>
  chatworkClient()
    .request({
      path: `/rooms/${req.room_id}/link`,
      method: 'PUT',
      query: {},
      body: {
        code: req.code,
        need_acceptance: req.need_acceptance ? 1 : 0,
        description: req.description,
      },
    })
    .then(chatworkClientResponseToCallToolResult);

export const deleteRoomLink = (
  req: z.infer<typeof deleteRoomLinkParamsSchema>,
) =>
  chatworkClient()
    .request({
      path: `/rooms/${req.path.room_id}/link`,
      method: 'DELETE',
      query: {},
      body: {},
    })
    .then(chatworkClientResponseToCallToolResult);

export const listIncomingRequests = () =>
  chatworkClient()
    .request({
      path: '/incoming_requests',
      method: 'GET',
      query: {},
      body: {},
    })
    .then(chatworkClientResponseToCallToolResult);

export const acceptIncomingRequest = (
  req: z.infer<typeof acceptIncomingRequestParamsSchema>,
) =>
  chatworkClient()
    .request({
      path: `/incoming_requests/${req.path.request_id}/accept`,
      method: 'PUT',
      query: {},
      body: {},
    })
    .then(chatworkClientResponseToCallToolResult);

export const rejectIncomingRequest = (
  req: z.infer<typeof rejectIncomingRequestParamsSchema>,
) =>
  chatworkClient()
    .request({
      path: `/incoming_requests/${req.path.request_id}/reject`,
      method: 'DELETE',
      query: {},
      body: {},
    })
    .then(chatworkClientResponseToCallToolResult);
