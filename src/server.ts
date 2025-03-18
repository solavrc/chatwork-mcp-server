import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { ChatworkClient, ChatworkClientResponse } from './chatworkClient';
import {
  listMyTasksParamsSchema,
  createRoomParamsSchema,
  getRoomParamsSchema,
  updateRoomParamsSchema,
  deleteOrLeaveRoomParamsSchema,
  listRoomMembersParamsSchema,
  updateRoomMembersParamsSchema,
  listRoomMessagesParamsSchema,
  postRoomMessageParamsSchema,
  readRoomMessagesParamsSchema,
  unreadRoomMessageParamsSchema,
  getRoomMessageParamsSchema,
  updateRoomMessageParamsSchema,
  deleteRoomMessageParamsSchema,
  listRoomTasksParamsSchema,
  createRoomTaskParamsSchema,
  getRoomTaskParamsSchema,
  updateRoomTasksStatusParamsSchema,
  listRoomFilesParamsSchema,
  getRoomFileParamsSchema,
  getRoomLinkParamsSchema,
  createRoomLinkParamsSchema,
  updateRoomLinkParamsSchema,
  deleteRoomLinkParamsSchema,
  acceptIncomingRequestParamsSchema,
  rejectIncomingRequestParamsSchema,
} from './schema';
import { CallToolResult } from '@modelcontextprotocol/sdk/types.js';

const chatworkApiToken = process.env['CHATWORK_API_TOKEN'];
if (chatworkApiToken === undefined) {
  throw new Error('CHATWORK_API_TOKEN is not set');
}

const chatworkClient = new ChatworkClient(chatworkApiToken);

const server = new McpServer({
  name: 'Chatwork',
  version: '0.0.1',
});

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

server.tool('get_me', () =>
  chatworkClient
    .request({
      path: '/me',
      method: 'GET',
      query: {},
      body: {},
    })
    .then(chatworkClientResponseToCallToolResult),
);

server.tool('get_my_status', () =>
  chatworkClient
    .request({
      path: '/my/status',
      method: 'GET',
      query: {},
      body: {},
    })
    .then(chatworkClientResponseToCallToolResult),
);

server.tool('list_my_tasks', listMyTasksParamsSchema.shape, (req) =>
  chatworkClient
    .request({
      path: '/my/tasks',
      method: 'GET',
      query: req.query,
      body: {},
    })
    .then(chatworkClientResponseToCallToolResult),
);

server.tool('list_contacts', () =>
  chatworkClient
    .request({
      path: '/contacts',
      method: 'GET',
      query: {},
      body: {},
    })
    .then(chatworkClientResponseToCallToolResult),
);

server.tool('list_rooms', () =>
  chatworkClient
    .request({
      path: '/rooms',
      method: 'GET',
      query: {},
      body: {},
    })
    .then(chatworkClientResponseToCallToolResult),
);

server.tool('create_room', createRoomParamsSchema.shape, (req) =>
  chatworkClient
    .request({
      path: '/rooms',
      method: 'POST',
      body: req.body,
      query: {},
    })
    .then(chatworkClientResponseToCallToolResult),
);

server.tool('get_room', getRoomParamsSchema.shape, (req) =>
  chatworkClient
    .request({
      path: `/rooms/${req.path.room_id}`,
      method: 'GET',
      query: {},
      body: {},
    })
    .then(chatworkClientResponseToCallToolResult),
);

server.tool('update_room', updateRoomParamsSchema.shape, (req) =>
  chatworkClient
    .request({
      path: `/rooms/${req.path.room_id}`,
      method: 'PUT',
      query: {},
      body: req.body,
    })
    .then(chatworkClientResponseToCallToolResult),
);

server.tool(
  'delete_or_leave_room',
  deleteOrLeaveRoomParamsSchema.shape,
  (req) =>
    chatworkClient
      .request({
        path: `/rooms/${req.path.room_id}`,
        method: 'DELETE',
        query: {},
        body: req.body,
      })
      .then(chatworkClientResponseToCallToolResult),
);

server.tool('list_room_members', listRoomMembersParamsSchema.shape, (req) =>
  chatworkClient
    .request({
      path: `/rooms/${req.path.room_id}/members`,
      method: 'GET',
      query: {},
      body: {},
    })
    .then(chatworkClientResponseToCallToolResult),
);

server.tool('update_room_members', updateRoomMembersParamsSchema.shape, (req) =>
  chatworkClient
    .request({
      path: `/rooms/${req.path.room_id}/members`,
      method: 'PUT',
      query: {},
      body: req.body,
    })
    .then(chatworkClientResponseToCallToolResult),
);

server.tool('list_room_messages', listRoomMessagesParamsSchema.shape, (req) =>
  chatworkClient
    .request({
      path: `/rooms/${req.path.room_id}/messages`,
      method: 'GET',
      query: req.query,
      body: {},
    })
    .then(chatworkClientResponseToCallToolResult),
);

server.tool('post_room_message', postRoomMessageParamsSchema.shape, (req) =>
  chatworkClient
    .request({
      path: `/rooms/${req.path.room_id}/messages`,
      method: 'POST',
      query: {},
      body: req.body,
    })
    .then(chatworkClientResponseToCallToolResult),
);

server.tool('read_room_messages', readRoomMessagesParamsSchema.shape, (req) =>
  chatworkClient
    .request({
      path: `/rooms/${req.path.room_id}/messages/read`,
      method: 'PUT',
      query: {},
      body: req.body,
    })
    .then(chatworkClientResponseToCallToolResult),
);

server.tool('unread_room_message', unreadRoomMessageParamsSchema.shape, (req) =>
  chatworkClient
    .request({
      path: `/rooms/${req.path.room_id}/messages/unread`,
      method: 'PUT',
      query: {},
      body: req.body,
    })
    .then(chatworkClientResponseToCallToolResult),
);

server.tool('get_room_message', getRoomMessageParamsSchema.shape, (req) =>
  chatworkClient
    .request({
      path: `/rooms/${req.path.room_id}/messages/${req.path.message_id}`,
      method: 'GET',
      query: {},
      body: {},
    })
    .then(chatworkClientResponseToCallToolResult),
);

server.tool('update_room_message', updateRoomMessageParamsSchema.shape, (req) =>
  chatworkClient
    .request({
      path: `/rooms/${req.path.room_id}/messages/${req.path.message_id}`,
      method: 'PUT',
      query: {},
      body: req.body,
    })
    .then(chatworkClientResponseToCallToolResult),
);

server.tool('delete_room_message', deleteRoomMessageParamsSchema.shape, (req) =>
  chatworkClient
    .request({
      path: `/rooms/${req.path.room_id}/messages/${req.path.message_id}`,
      method: 'DELETE',
      query: {},
      body: {},
    })
    .then(chatworkClientResponseToCallToolResult),
);

server.tool('list_room_tasks', listRoomTasksParamsSchema.shape, (req) =>
  chatworkClient
    .request({
      path: `/rooms/${req.path.room_id}/tasks`,
      method: 'GET',
      query: req.query,
      body: {},
    })
    .then(chatworkClientResponseToCallToolResult),
);

server.tool('create_room_task', createRoomTaskParamsSchema.shape, (req) =>
  chatworkClient
    .request({
      path: `/rooms/${req.path.room_id}/tasks`,
      method: 'POST',
      query: {},
      body: req.body,
    })
    .then(chatworkClientResponseToCallToolResult),
);

server.tool('get_room_task', getRoomTaskParamsSchema.shape, (req) =>
  chatworkClient
    .request({
      path: `/rooms/${req.path.room_id}/tasks/${req.path.task_id}`,
      method: 'GET',
      query: {},
      body: {},
    })
    .then(chatworkClientResponseToCallToolResult),
);

server.tool(
  'update_room_task_status',
  updateRoomTasksStatusParamsSchema.shape,
  (req) =>
    chatworkClient
      .request({
        path: `/rooms/${req.path.room_id}/tasks/${req.path.task_id}/status`,
        method: 'PUT',
        query: {},
        body: req.body,
      })
      .then(chatworkClientResponseToCallToolResult),
);

server.tool('list_room_files', listRoomFilesParamsSchema.shape, (req) =>
  chatworkClient
    .request({
      path: `/rooms/${req.path.room_id}/files`,
      method: 'GET',
      query: {},
      body: {},
    })
    .then(chatworkClientResponseToCallToolResult),
);

server.tool('get_room_file', getRoomFileParamsSchema.shape, (req) =>
  chatworkClient
    .request({
      path: `/rooms/${req.path.room_id}/files/${req.path.file_id}`,
      method: 'GET',
      query: req.query,
      body: {},
    })
    .then(chatworkClientResponseToCallToolResult),
);

server.tool('get_room_link', getRoomLinkParamsSchema.shape, (req) =>
  chatworkClient
    .request({
      path: `/rooms/${req.path.room_id}/link`,
      method: 'GET',
      query: {},
      body: {},
    })
    .then(chatworkClientResponseToCallToolResult),
);

server.tool('create_room_link', createRoomLinkParamsSchema.shape, (req) =>
  chatworkClient
    .request({
      path: `/rooms/${req.path.room_id}/link`,
      method: 'POST',
      query: {},
      body: req.body,
    })
    .then(chatworkClientResponseToCallToolResult),
);

server.tool('update_room_link', updateRoomLinkParamsSchema.shape, (req) =>
  chatworkClient
    .request({
      path: `/rooms/${req.path.room_id}/link`,
      method: 'PUT',
      query: {},
      body: req.body,
    })
    .then(chatworkClientResponseToCallToolResult),
);

server.tool('delete_room_link', deleteRoomLinkParamsSchema.shape, (req) =>
  chatworkClient
    .request({
      path: `/rooms/${req.path.room_id}/link`,
      method: 'DELETE',
      query: {},
      body: {},
    })
    .then(chatworkClientResponseToCallToolResult),
);

server.tool(
  'accept_incoming_request',
  acceptIncomingRequestParamsSchema.shape,
  (req) =>
    chatworkClient
      .request({
        path: `/incoming_requests/${req.path.request_id}/accept`,
        method: 'PUT',
        query: {},
        body: {},
      })
      .then(chatworkClientResponseToCallToolResult),
);

server.tool(
  'reject_incoming_request',
  rejectIncomingRequestParamsSchema.shape,
  (req) =>
    chatworkClient
      .request({
        path: `/incoming_requests/${req.path.request_id}/reject`,
        method: 'DELETE',
        query: {},
        body: {},
      })
      .then(chatworkClientResponseToCallToolResult),
);

export { server };
