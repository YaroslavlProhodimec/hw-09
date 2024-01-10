import { Db, MongoClient } from "mongodb";
import { PostDBType } from "./dto/postsDTO/PostModel";
import * as dotenv from "dotenv";
import { BlogDBType } from "./dto/blogsDTO/BlogModel";
import { UserDBType } from "./dto/usersDTO/usersDTO";
import { CommentDBType } from "./dto/commentsDTO/commentsDTO";
import { RefreshTokensBlacklistDB } from "./dto/authDTO/authDTO";
import {BlogType} from "./types/blog/output";
import {PostType} from "./types/post/output";
import * as mongoose from "mongoose";
import {DevicesDbModel} from "./models/divice-model/devices-db-model";
import {DeviceSchema} from "./db/schemas/device-schema";
dotenv.config();
export const mongoURI = process.env.MONGO_URL

export const client = new MongoClient(mongoURI as string);

const dbName = "blogs-posts";
export const dbBlogs = client.db('node-blogs')

export const blogCollection = dbBlogs.collection<BlogType>('blogs')
export const postCollection = dbBlogs.collection<PostType>('post')
export const commentsCollection = dbBlogs.collection('comments')
export const usersCollection = dbBlogs.collection<any>('users')
export const refreshTokensBlacklistedCollection =
    dbBlogs.collection<RefreshTokensBlacklistDB>("refresh-tokens-blacklisted");




export const DevicesModel = mongoose.model<DevicesDbModel>('auth_devices', DeviceSchema)

export const runDB = async () => {
    try {
        await mongoose.connect(mongoURI as string)
        await client.connect();
        console.log("Connected successfully to mongo server");
        await dbBlogs.command({ ping: 1 });
        console.log("Client connected");
    } catch (e) {
        await mongoose.disconnect()
        console.log("Can't connect to DB: ", e);
        await client.close();
    }
};
