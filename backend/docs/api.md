# TaskFlow API Documentation

## Authentication

### Register a new user
**POST** `/api/auth/register`

**Request Body**
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "string" // Optional: 'admin', 'manager', 'member'
}
```

**Response**
```json
{
  "success": true,
  "token": "string",
  "data": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

### Login user
**POST** `/api/auth/login`

**Request Body**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response**
```json
{
  "success": true,
  "token": "string",
  "data": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

### Get current user profile
**GET** `/api/auth/profile`

**Headers**
```
Authorization: Bearer <token>
```

**Response**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

### Update user profile
**PUT** `/api/auth/profile`

**Headers**
```
Authorization: Bearer <token>
```

**Request Body**
```json
{
  "name": "string",
  "email": "string"
}
```

**Response**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

## Users

### Get all users
**GET** `/api/users`

**Headers**
```
Authorization: Bearer <token>
```

**Response**
```json
{
  "success": true,
  "count": "number",
  "data": [
    {
      "id": "string",
      "name": "string",
      "email": "string",
      "role": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
  ]
}
```

### Get user by ID
**GET** `/api/users/:id`

**Headers**
```
Authorization: Bearer <token>
```

**Response**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

### Create user
**POST** `/api/users`

**Headers**
```
Authorization: Bearer <token>
```

**Request Body**
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "string"
}
```

**Response**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

### Update user
**PUT** `/api/users/:id`

**Headers**
```
Authorization: Bearer <token>
```

**Request Body**
```json
{
  "name": "string",
  "email": "string",
  "role": "string"
}
```

**Response**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

### Delete user
**DELETE** `/api/users/:id`

**Headers**
```
Authorization: Bearer <token>
```

**Response**
```json
{
  "success": true,
  "data": {}
}
```

## Projects

### Get all projects
**GET** `/api/projects`

**Headers**
```
Authorization: Bearer <token>
```

**Query Parameters**
- `select` (string): Fields to select (comma-separated)
- `sort` (string): Sort by fields (comma-separated)
- `page` (number): Page number
- `limit` (number): Number of records per page

**Response**
```json
{
  "success": true,
  "count": "number",
  "pagination": {
    "next": {
      "page": "number",
      "limit": "number"
    },
    "previous": {
      "page": "number",
      "limit": "number"
    }
  },
  "data": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "owner": "string",
      "members": [
        {
          "user": "string",
          "role": "string"
        }
      ],
      "startDate": "date",
      "endDate": "date",
      "status": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
  ]
}
```

### Get project by ID
**GET** `/api/projects/:id`

**Headers**
```
Authorization: Bearer <token>
```

**Response**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "description": "string",
    "owner": {
      "id": "string",
      "name": "string",
      "email": "string"
    },
    "members": [
      {
        "user": {
          "id": "string",
          "name": "string",
          "email": "string"
        },
        "role": "string"
      }
    ],
    "startDate": "date",
    "endDate": "date",
    "status": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

### Create project
**POST** `/api/projects`

**Headers**
```
Authorization: Bearer <token>
```

**Request Body**
```json
{
  "name": "string",
  "description": "string",
  "startDate": "date",
  "endDate": "date",
  "status": "string"
}
```

**Response**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "description": "string",
    "owner": "string",
    "members": [],
    "startDate": "date",
    "endDate": "date",
    "status": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

### Update project
**PUT** `/api/projects/:id`

**Headers**
```
Authorization: Bearer <token>
```

**Request Body**
```json
{
  "name": "string",
  "description": "string",
  "startDate": "date",
  "endDate": "date",
  "status": "string"
}
```

**Response**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "description": "string",
    "owner": "string",
    "members": [],
    "startDate": "date",
    "endDate": "date",
    "status": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

### Delete project
**DELETE** `/api/projects/:id`

**Headers**
```
Authorization: Bearer <token>
```

**Response**
```json
{
  "success": true,
  "data": {}
}
```

### Add member to project
**POST** `/api/projects/:id/members`

**Headers**
```
Authorization: Bearer <token>
```

**Request Body**
```json
{
  "userId": "string",
  "role": "string" // Optional: 'admin', 'manager', 'member'
}
```

**Response**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "description": "string",
    "owner": "string",
    "members": [
      {
        "user": "string",
        "role": "string"
      }
    ],
    "startDate": "date",
    "endDate": "date",
    "status": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

### Remove member from project
**DELETE** `/api/projects/:id/members/:userId`

**Headers**
```
Authorization: Bearer <token>
```

**Response**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "description": "string",
    "owner": "string",
    "members": [],
    "startDate": "date",
    "endDate": "date",
    "status": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

## Tasks

### Get all tasks
**GET** `/api/tasks`

**Headers**
```
Authorization: Bearer <token>
```

**Query Parameters**
- `select` (string): Fields to select (comma-separated)
- `sort` (string): Sort by fields (comma-separated)
- `page` (number): Page number
- `limit` (number): Number of records per page

**Response**
```json
{
  "success": true,
  "count": "number",
  "pagination": {
    "next": {
      "page": "number",
      "limit": "number"
    },
    "previous": {
      "page": "number",
      "limit": "number"
    }
  },
  "data": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "project": {
        "id": "string",
        "name": "string"
      },
      "assignee": {
        "id": "string",
        "name": "string",
        "email": "string"
      },
      "createdBy": {
        "id": "string",
        "name": "string",
        "email": "string"
      },
      "priority": "string",
      "status": "string",
      "dueDate": "date",
      "attachments": [],
      "comments": [],
      "subtasks": [],
      "createdAt": "date",
      "updatedAt": "date"
    }
  ]
}
```

### Get task by ID
**GET** `/api/tasks/:id`

**Headers**
```
Authorization: Bearer <token>
```

**Response**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "title": "string",
    "description": "string",
    "project": {
      "id": "string",
      "name": "string"
    },
    "assignee": {
      "id": "string",
      "name": "string",
      "email": "string"
    },
    "createdBy": {
      "id": "string",
      "name": "string",
      "email": "string"
    },
    "priority": "string",
    "status": "string",
    "dueDate": "date",
    "attachments": [],
    "comments": [],
    "subtasks": [],
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

### Create task
**POST** `/api/tasks`

**Headers**
```
Authorization: Bearer <token>
```

**Request Body**
```json
{
  "title": "string",
  "description": "string",
  "project": "string",
  "assignee": "string", // Optional
  "priority": "string", // Optional: 'low', 'medium', 'high', 'urgent'
  "status": "string", // Optional: 'todo', 'in-progress', 'review', 'done'
  "dueDate": "date" // Optional
}
```

**Response**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "title": "string",
    "description": "string",
    "project": "string",
    "assignee": "string",
    "createdBy": "string",
    "priority": "string",
    "status": "string",
    "dueDate": "date",
    "attachments": [],
    "comments": [],
    "subtasks": [],
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

### Update task
**PUT** `/api/tasks/:id`

**Headers**
```
Authorization: Bearer <token>
```

**Request Body**
```json
{
  "title": "string",
  "description": "string",
  "assignee": "string",
  "priority": "string",
  "status": "string",
  "dueDate": "date"
}
```

**Response**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "title": "string",
    "description": "string",
    "project": "string",
    "assignee": "string",
    "createdBy": "string",
    "priority": "string",
    "status": "string",
    "dueDate": "date",
    "attachments": [],
    "comments": [],
    "subtasks": [],
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

### Delete task
**DELETE** `/api/tasks/:id`

**Headers**
```
Authorization: Bearer <token>
```

**Response**
```json
{
  "success": true,
  "data": {}
}
```

### Update task status
**PUT** `/api/tasks/:id/status`

**Headers**
```
Authorization: Bearer <token>
```

**Request Body**
```json
{
  "status": "string" // 'todo', 'in-progress', 'review', 'done'
}
```

**Response**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "title": "string",
    "description": "string",
    "project": "string",
    "assignee": "string",
    "createdBy": "string",
    "priority": "string",
    "status": "string",
    "dueDate": "date",
    "attachments": [],
    "comments": [],
    "subtasks": [],
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

## Comments

### Get all comments
**GET** `/api/comments`

**Headers**
```
Authorization: Bearer <token>
```

**Query Parameters**
- `select` (string): Fields to select (comma-separated)
- `sort` (string): Sort by fields (comma-separated)
- `page` (number): Page number
- `limit` (number): Number of records per page

**Response**
```json
{
  "success": true,
  "count": "number",
  "pagination": {
    "next": {
      "page": "number",
      "limit": "number"
    },
    "previous": {
      "page": "number",
      "limit": "number"
    }
  },
  "data": [
    {
      "id": "string",
      "content": "string",
      "task": {
        "id": "string",
        "title": "string"
      },
      "author": {
        "id": "string",
        "name": "string",
        "email": "string"
      },
      "createdAt": "date",
      "updatedAt": "date"
    }
  ]
}
```

### Get comment by ID
**GET** `/api/comments/:id`

**Headers**
```
Authorization: Bearer <token>
```

**Response**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "content": "string",
    "task": {
      "id": "string",
      "title": "string"
    },
    "author": {
      "id": "string",
      "name": "string",
      "email": "string"
    },
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

### Create comment
**POST** `/api/comments`

**Headers**
```
Authorization: Bearer <token>
```

**Request Body**
```json
{
  "content": "string",
  "task": "string"
}
```

**Response**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "content": "string",
    "task": "string",
    "author": {
      "id": "string",
      "name": "string",
      "email": "string"
    },
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

### Update comment
**PUT** `/api/comments/:id`

**Headers**
```
Authorization: Bearer <token>
```

**Request Body**
```json
{
  "content": "string"
}
```

**Response**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "content": "string",
    "task": "string",
    "author": {
      "id": "string",
      "name": "string",
      "email": "string"
    },
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

### Delete comment
**DELETE** `/api/comments/:id`

**Headers**
```
Authorization: Bearer <token>
```

**Response**
```json
{
  "success": true,
  "data": {}
}
```