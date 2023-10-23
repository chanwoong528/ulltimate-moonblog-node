//@ts-nocheck
import Post from "../../Model/mongo/post.model";
import { Category } from "../../Model/postgres/category.model";
import { CustomError } from "../../utils/exception/CustomError";

import OpenAI from "openai";

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
      const openai = new OpenAI({
        organization: "org-hJLENY4679XPtJ4fnRyJBXEi",
        apiKey: process.env.OPENAI_API_KEY,
      });

      const onePost = await Post.findById(id);
      if (!onePost) {
        throw new CustomError("NotFoundError", "result not found in database");
      }
      let summary = {};
      if (!!onePost.contentEng) {
        //TODO: may be need to be in different controller due to response time on chat AI
        let aiResEng = await openai.chat.completions.create({
          model: "gpt-3.5-turbo-16k",
          messages: [
            {
              role: "user",
              content: `Summarize following content: ${onePost.contentEng}`,
            },
          ],
          max_tokens: 2048,
        });
        summary["engVersion"] = aiResEng.choices;
      }

      if (!!onePost.contentKor) {
        let aiResKor = await openai.chat.completions.create({
          model: "gpt-3.5-turbo-16k",
          messages: [
            {
              role: "user",
              content: `Summarize following content: ${onePost.contentKor}`,
            },
          ],
          max_tokens: 2048,
        });
        summary["korVersion"] = aiResKor.choices;
      }
      return { onePost, summary };
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
