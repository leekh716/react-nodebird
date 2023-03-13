import produce from "immer";
import shortId from "shortid";

export const initialState = {
  mainPosts: [],
  imagePaths: [],
  hasMorePosts: true,
  likePostLoading: false,
  likePostDone: false,
  likePostError: null,
  unlikePostLoading: false,
  unlikePostDone: false,
  unlikePostError: null,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,
  retweetLoading: false,
  retweetDone: false,
  retweetError: null,
};

const dummy = {
  id: shortId.generate(),
  User: {
    id: shortId.generate(),
    nickname: "쿤리",
  },
  content: "첫 번째 게시글 #해시태그 #익스프레스",
  Images: [
    {
      id: shortId.generate(),
      src: "data:image/jpeg;base64,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",
    },
    {
      id: shortId.generate(),
      src: "data:image/jpeg;base64,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",
    },
    {
      id: shortId.generate(),
      src: "data:image/jpeg;base64,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",
    },
  ],
  Comments: [
    {
      id: shortId.generate(),
      User: {
        id: shortId.generate(),
        nickname: "rhio",
      },
      content: "얼른 사고 싶어요~",
    },
    {
      id: shortId.generate(),
      User: {
        id: shortId.generate(),
        nickname: "규호",
      },
      content: "저도~",
    },
  ],
};

export const generateDummyPost = (number) =>
  Array(number)
    .fill()
    .map(() => ({ ...dummy }));

// initialState.mainPosts = initialState.mainPosts.concat(generateDummyPost(10));

// initialState.mainPosts = initialState.mainPosts.concat(
//   Array(20)
//     .fill()
//     .map(() => ({
//       id: shortId.generate(),
//       User: {
//         id: shortId.generate(),
//         nickname: faker.(),
//       },
//       content: faker.lorem.paragraph,
//       Images: [
//         {
//           src: faker.image.image(),
//         },
//       ],
//       Comments: [
//         {
//           User: {
//             id: shortId.generate(),
//             nickname: faker.name.findName(),
//           },
//           content: faker.lorem.sentence(),
//         },
//       ],
//     }))
// );

export const UPLOAD_IMAGES_REQUEST = "UPLOAD_IMAGES_REQUEST";
export const UPLOAD_IMAGES_SUCCESS = "UPLOAD_IMAGES_SUCCESS";
export const UPLOAD_IMAGES_FAILURE = "UPLOAD_IMAGES_FAILURE";

export const LIKE_POST_REQUEST = "LIKE_POST_REQUEST";
export const LIKE_POST_SUCCESS = "LIKE_POST_SUCCESS";
export const LIKE_POST_FAILURE = "LIKE_POST_FAILURE";

export const UNLIKE_POST_REQUEST = "UNLIKE_POST_REQUEST";
export const UNLIKE_POST_SUCCESS = "UNLIKE_POST_SUCCESS";
export const UNLIKE_POST_FAILURE = "UNLIKE_POST_FAILURE";

export const LOAD_POSTS_REQUEST = "LOAD_POSTS_REQUEST";
export const LOAD_POSTS_SUCCESS = "LOAD_POSTS_SUCCESS";
export const LOAD_POSTS_FAILURE = "LOAD_POSTS_FAILURE";

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const RETWEET_REQUEST = "RETWEET_REQUEST";
export const RETWEET_SUCCESS = "RETWEET_SUCCESS";
export const RETWEET_FAILURE = "RETWEET_FAILURE";

export const REMOVE_IMAGE = "REMOVE_IMAGE";

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const dummyPost = (data) => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: "쿤리",
  },
  Images: [],
  Comments: [],
});

const dummyComment = (data) => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: 1,
    nickname: "쿤리",
  },
});

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case REMOVE_IMAGE:
        draft.imagePaths = draft.imagePaths.filter((v, i) => i !== action.data);
        break;
      case UPLOAD_IMAGES_REQUEST:
        draft.uploadImagesLoading = true;
        draft.uploadImagesDone = false;
        draft.uploadImagesError = null;
        break;
      case UPLOAD_IMAGES_SUCCESS: {
        draft.imagePaths = action.data;
        draft.uploadImagesLoading = false;
        draft.uploadImagesDone = true;
        break;
      }
      case UPLOAD_IMAGES_FAILURE:
        draft.uploadImagesLoading = false;
        draft.uploadImagesError = action.error;
        break;
      case LIKE_POST_REQUEST:
        draft.likePostLoading = true;
        draft.likePostDone = false;
        draft.likePostError = null;
        break;
      case LIKE_POST_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
        post.Likers.push({ id: action.data.UserId });
        draft.likePostLoading = false;
        draft.likePostDone = true;
        break;
      }
      case LIKE_POST_FAILURE:
        draft.likePostLoading = false;
        draft.likePostError = action.error;
        break;
      case UNLIKE_POST_REQUEST:
        draft.unlikePostLoading = true;
        draft.unlikePostDone = false;
        draft.unlikePostError = null;
        break;
      case UNLIKE_POST_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
        post.Likers = post.Likers.filter((v) => v.id !== action.data.UserId);
        draft.unlikePostLoading = false;
        draft.unlikePostDone = true;
        break;
      }
      case UNLIKE_POST_FAILURE:
        draft.unlikePostLoading = false;
        draft.unlikePostError = action.error;
        break;
      case LOAD_POSTS_REQUEST:
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;
      case LOAD_POSTS_SUCCESS:
        draft.mainPosts = draft.mainPosts.concat(action.data);
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.hasMorePosts = action.data.length === 10;
        break;
      case LOAD_POSTS_FAILURE:
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
        break;
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.mainPosts.unshift(action.data);
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.imagePaths = [];
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      case REMOVE_POST_SUCCESS:
        draft.removePostLoading = false;
        draft.removePostDone = true;
        draft.mainPosts = draft.mainPosts.filter(
          (v) => v.id !== action.data.PostId
        );
        break;
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
        post.Comments.unshift(action.data);
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      }
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;
      case RETWEET_REQUEST:
        draft.retweetLoading = true;
        draft.retweetDone = false;
        draft.retweetError = null;
        break;
      case RETWEET_SUCCESS: {
        draft.retweetLoading = false;
        draft.retweetDone = true;
        draft.mainPosts.unshift(action.data);
        break;
      }
      case RETWEET_FAILURE:
        draft.retweetLoading = false;
        draft.retweetError = action.error;
        break;
      default:
        break;
    }
  });
};

export default reducer;
