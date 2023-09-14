//@ts-nocheck
import Post from "../../Model/mongo/post.model";
import { Category } from "../../Model/postgres/category.model";
import { CustomError } from "../../utils/exception/CustomError";

export const createPost = async (
  categoryId: string,
  titleEng: string,
  contentEng: string,
  titleKor?: string,
  contentKor?: string,
  tags?: string
) => {
  try {
    const existCategory = await Category.findOne({ where: { id: categoryId } });
    if (!existCategory) {
      throw new CustomError("NotFoundError", "Category Not found");
    }
    const newPost = await new Post({
      categoryId,
      titleEng,
      contentEng,
      ...(!!titleKor && { titleKor }),
      ...(!!contentKor && { contentKor }),
      ...(!!tags && { tags }),
    }).save();

    return newPost;
  } catch (error) {
    throw error;
  }
};

export const getPosts = async (id?: string, categoryId?: string) => {
  try {
    if (!!id) {
      const onePost = await Post.findById(id);
      if (!onePost) {
        throw new CustomError("NotFoundError", "result not found in database");
      }
      return onePost;
    } else if (!!categoryId) {
      const targetPosts = await Post.find({ categoryId });
      if (targetPosts.length < 1) {
        throw new CustomError("NotFoundError", "result not found in database");
      }
      return targetPosts;
    }
    return await Post.find({});
  } catch (error) {
    throw error;
  }
};

export const patchPost = async (
  id: string,
  titleEng?: string,
  contentEng?: string,
  titleKor?: string,
  contentKor?: string,
  views?: number,
  shareCount?: number,
  likes?: number,
  dislikes?: number,
  tags?: string
) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      { _id: id },
      {
        ...(!!titleEng && { titleEng }),
        ...(!!contentEng && { contentEng }),
        ...(!!titleKor && { titleKor }),
        ...(!!contentKor && { contentKor }),
        ...(!!views && { views }),
        ...(!!shareCount && { shareCount }),
        ...(!!likes && { likes }),
        ...(!!dislikes && { dislikes }),
        ...(!!tags && { tags }),
        updatedDate: Date.now(),
      }
    );
    if (!updatedPost) {
      throw new CustomError("NotFoundError", "result not found in database");
    }
    return updatedPost;
  } catch (error) {
    throw error;
  }
};
