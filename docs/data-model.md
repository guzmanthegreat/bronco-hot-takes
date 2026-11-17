# Data Model

Firestore collections and fields.
# Firestore Data Model
Define how posts, replies, and votes are stored in Firestore.

# Firestore Paths

| Data | Firestore path |
|---|---|
| Post | `posts/{postId}` |
| Reply | `posts/{postId}/replies/{replyId}` |
| Vote | `posts/{postId}/votes/{userId}` |

# Collection Posts

| Field | Type | Required | Description |
|---|---|---:|---|
| `text` | string | Yes | Content of the post |
| `authorId` | string | Yes | Firebase user ID |
| `authorUsername` | string | Yes | Display username |
| `createdAt` | timestamp | Yes | Creation time |
| `score` | number | Yes | Upvotes minus downvotes |
| `replyCount` | number | Yes | Number of replies |

# Example Post

```json
{
  "text": "Yoooo!!! ASI ASI is giving away free food.",
  "authorId": "user_123",
  "authorUsername": "noname",
  "createdAt": "Firestore Timestamp",
  "score": 88,
  "replyCount": 0
}
```
# Collection Replies 

| Field | Type | Required | Description |
|---|---|---:|---|
| `postId` | string | Yes | ID of the post being replied to |
| `text` | string | Yes | Content of the reply |
| `authorID` | string | Yes | Firebase Auth user ID of the author |
| `authorUsername` | string | Yes | Display username shown with the reply |
| `createdAt` | timestamp | Yes | Time when the reply was created |

# Example Replies 

```json
{
  "postId": "p1",
  "text": "Yoooo!!! ASI ASI is giving away free food.",
  "authorId": "user_46",
  "authorUsername": "broncobilly",
  "createdAt": "Firestore Timestamp"
}
```
# Collection Vote

| Field | Type | Required | Description |
|---|---|---:|---|
| `userId` | string | Yes | Firebase Auth user ID |
| `value` | number | Yes | 1 for upvote or -1 for downvote |
| `createdAt` | timestamp | Yes | Time when the vote was created or updated |

# Example Vote 

```json
{
  "userId": "user_46",
  "value": 1,
  "createdAt": "Firestore Timestamp"
}
```
