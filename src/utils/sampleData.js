// Hardcoded sample data for building UI before Firestore is wired up.
// Field names should match what the services will return later.

const HOUR = 60 * 60 * 1000;
const now = Date.now();

export const sampleUsers = [
  { id: "u1", username: "broncobilly" },
  { id: "u2", username: "kelloggkid" },
  { id: "u3", username: "parkinglotsurvivor" },
];

export const samplePosts = [
  {
    id: "p1",
    text: "Parking structure 2 at 9:55am is the real final exam.",
    authorId: "u3",
    authorUsername: "parkinglotsurvivor",
    createdAt: new Date(now - 2 * HOUR),
    score: 42,
    replyCount: 3,
  },
  {
    id: "p2",
    text: "The Farm Store strawberries are better than anything at the grocery store and I will not be taking questions.",
    authorId: "u1",
    authorUsername: "broncobilly",
    createdAt: new Date(now - 30 * 60 * 1000),
    score: 17,
    replyCount: 1,
  },
  {
    id: "p3",
    text: "8am classes should be illegal.",
    authorId: "u2",
    authorUsername: "kelloggkid",
    createdAt: new Date(now - 26 * HOUR),
    score: 88,
    replyCount: 0,
  },
  {
    id: "p4",
    text: "The library 4th floor is too quiet. It's creepy. Give me some background noise.",
    authorId: "u1",
    authorUsername: "broncobilly",
    createdAt: new Date(now - 5 * HOUR),
    score: -4,
    replyCount: 2,
  },
  {
    id: "p5",
    text: "Walking from the dorms to building 8 counts as cardio.",
    authorId: "u2",
    authorUsername: "kelloggkid",
    createdAt: new Date(now - 3 * 24 * HOUR),
    score: 25,
    replyCount: 0,
  },
  {
    id: "p6",
    text: "Hot take: the Arabian horse shows are the most underrated thing on campus.",
    authorId: "u3",
    authorUsername: "parkinglotsurvivor",
    createdAt: new Date(now - 10 * 60 * 1000),
    score: 3,
    replyCount: 0,
  },
];

export const sampleReplies = [
  {
    id: "r1",
    postId: "p1",
    text: "I just park off campus and walk now.",
    authorId: "u1",
    authorUsername: "broncobilly",
    createdAt: new Date(now - 90 * 60 * 1000),
  },
  {
    id: "r2",
    postId: "p1",
    text: "Circling for 20 minutes is part of the curriculum.",
    authorId: "u2",
    authorUsername: "kelloggkid",
    createdAt: new Date(now - 80 * 60 * 1000),
  },
  {
    id: "r3",
    postId: "p1",
    text: "Lot F at 7am or don't bother.",
    authorId: "u3",
    authorUsername: "parkinglotsurvivor",
    createdAt: new Date(now - 45 * 60 * 1000),
  },
  {
    id: "r4",
    postId: "p2",
    text: "The strawberry ice cream too.",
    authorId: "u2",
    authorUsername: "kelloggkid",
    createdAt: new Date(now - 15 * 60 * 1000),
  },
  {
    id: "r5",
    postId: "p4",
    text: "Bring headphones like a normal person.",
    authorId: "u3",
    authorUsername: "parkinglotsurvivor",
    createdAt: new Date(now - 4 * HOUR),
  },
  {
    id: "r6",
    postId: "p4",
    text: "Agreed, the silence is too loud.",
    authorId: "u2",
    authorUsername: "kelloggkid",
    createdAt: new Date(now - 3 * HOUR),
  },
];
