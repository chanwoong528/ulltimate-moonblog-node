import Comment from "../../Model/mongo/comment.model";
import Post from "../../Model/mongo/post.model";
import { User } from "../../Model/postgres/blogUser.model";
import { InteractiveCount } from "../../Model/postgres/interactiveCount.model";
import { updateOrCreate } from "../../utils/common/dbUtil";
import { CONTENT_TYPE } from "../../utils/constant/DATA_TYPES";
import { CustomError } from "../../utils/exception/CustomError";

export const createOrPatchInteractive = async (
  userId: string,
  contentId: string,
  contentType: string,
  interactiveType: string
) => {
  try {
    const newEntity = {
      userId,
      contentId,
      contentType,
      interactiveType,
    };
    if (!userId || !contentId || !contentType || !interactiveType) {
      throw new CustomError("SequelizeValidationError", "parameter needed");
    }
    const existUser = await User.findOne({ where: { id: userId } });
    if (!existUser) {
      throw new CustomError("NotFoundError", "result not found in database");
    }

    switch (contentType) {
      case CONTENT_TYPE.post:
        const existPost = await Post.findById(contentId);
        if (!!existPost) {
          const updateOrCreatePostInter = await updateOrCreate(
            InteractiveCount,
            { userId, contentId },
            newEntity
          );
          return updateOrCreatePostInter;
        }

        throw new CustomError("NotFoundError", "result not found in database");

      case CONTENT_TYPE.comment:
        const existPostComment = await Comment.findById(contentId);
        if (!!existPostComment) {
          const updateOrCreateCommentInter = await updateOrCreate(
            InteractiveCount,
            { userId, contentId },
            newEntity
          );
          return updateOrCreateCommentInter;
        }

        throw new CustomError("NotFoundError", "result not found in database");

      default:
        throw new CustomError("UnsupportedType", "UnsupportedType on patch");
    }
  } catch (error) {
    throw error;
  }
};

export const getInteractiveCount = async (
  userId?: string,
  contentId?: string
) => {
  try {
    if (!!userId && !contentId) {
      const userIdInteractiveCounts = await InteractiveCount.findAll({
        where: { userId },
      });
      return userIdInteractiveCounts.map((item) => item.dataValues);
    } else if (!!contentId && !userId) {
      const contentInteractiveCounts = await InteractiveCount.findAll({
        where: { contentId },
      });
      return contentInteractiveCounts.map((item) => item.dataValues);
    } else if (!!contentId && !!userId) {
      const specificInteractiveCount = await InteractiveCount.findOne({
        where: {
          userId,
          contentId,
        },
      });
      return specificInteractiveCount?.dataValues;
    }
    throw new CustomError("SequelizeValidationError", "parameter needed");
  } catch (error) {
    throw error;
  }
};
