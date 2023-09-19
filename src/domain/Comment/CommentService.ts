import Comment from "../../Model/mongo/comment.model";
import Post from "../../Model/mongo/post.model";
import { verifyToken } from "../../utils/common/jwtUtil";
import { CustomError } from "../../utils/exception/CustomError";
import { COMMENT_PATCH_TYPE } from "../../utils/constant/DATA_TYPES";

export const createGuestbook = async (
  accessToken: string,
  content: string,
  parentId?: string,
  postId?: string
) => {
  try {
    const userData = verifyToken(accessToken);
    const { id, name } = userData.data;
    if (!!parentId) {
      const parentGuestbook = await getGuestbooks(parentId);
      if (!parentGuestbook)
        throw new CustomError("NotFoundError", "result not found in database");
    }
    if (!!postId) {
      const existPost = await Post.findById(postId);
      if (!existPost)
        throw new CustomError("NotFoundError", "result not found in database");
    }
    const newGuestbook = await Comment.create({
      userId: id,
      userName: name,
      content,
      parentId: !!parentId ? parentId : null,
      postId: !!postId ? postId : null,
    });
    return newGuestbook;
  } catch (error) {
    throw error;
  }
};

export const getGuestbooks = async (id?: string, parentId?: string) => {
  if (!!id) {
    const oneGuestbook = await Comment.findById(id);
    if (!oneGuestbook) {
      throw new CustomError("NotFoundError", "result not found in database");
    }
    return oneGuestbook;
  } else if (!!parentId) {
    const targetGuestbooks = await Comment.find({
      parentId,
      // $and: [{ parentId: { $ne: null } }, { parentId: parentId }],
    });
    if (targetGuestbooks.length < 1) {
      throw new CustomError("NotFoundError", "result not found in database");
    }
    return targetGuestbooks;
  }
  const firstGuestbooks = await Comment.find({
    $and: [{ parentId: null }, { postId: null }],
  });
  return firstGuestbooks;
};

export const patchComment = async (id: string, type: string) => {
  switch (type) {
    case COMMENT_PATCH_TYPE.likeInc:
      const updateCommentInc = await Comment.findByIdAndUpdate(
        { _id: id },
        { $inc: { likes: 1 } },
        { new: true }
      );
      return updateCommentInc;
    case COMMENT_PATCH_TYPE.likeDes:
      const updateCommentDes = await Comment.findByIdAndUpdate(
        { _id: id },
        { $inc: { likes: -1 } },
        { new: true }
      );
      return updateCommentDes;

    case COMMENT_PATCH_TYPE.dislikeInc:
      const updateCommentIncHate = await Comment.findByIdAndUpdate(
        { _id: id },
        { $inc: { dislikes: 1 } },
        { new: true }
      );
      return updateCommentIncHate;
    case COMMENT_PATCH_TYPE.dislikeDes:
      const updateCommentDesHate = await Comment.findByIdAndUpdate(
        { _id: id },
        { $inc: { dislikes: -1 } },
        { new: true }
      );
      return updateCommentDesHate;
    default:
      throw new CustomError("UnsupportedType", "UnsupportedType on patch");
  }
};