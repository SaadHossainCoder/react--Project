import conf from '../conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite"; 


export class Service{
    Client = new Client();
    databases;
    bucket;
    
    constructor(){

        this.Client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        
        this.databases = new Databases(this.Client);
        this.bucket = new Storage(this.Client);
    }

    //-----------get post------------- 
    async createPost({title, slug, content, featuredImages, status, userId}){
        // eslint-disable-next-line no-useless-catch
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf. appwriteCollectionId,
                slug, 
                {
                    title,
                    content,
                    featuredImages,
                    status,
                    userId,
                }
            )
        } catch (error) {
            throw error;
        }
    }

    async updatePost (slug,{title,  content, featuredImages, status}){
        // eslint-disable-next-line no-useless-catch
        try { 
         
            return await this.databases.updateDocument(
                conf.ClientWriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImages,
                    status,
                }
            )
        } catch (error) {
            throw error;
        }
    }

    async deletePost(slug){
        // eslint-disable-next-line no-useless-catch
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            throw error;
            // eslint-disable-next-line no-unreachable
            return false;
        }
    }

    async getPost(slug){
        // eslint-disable-next-line no-useless-catch
        try {
            await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            throw error;
        }
    }

    async getPosts(query =[Query.equal(("status"))]){
        // eslint-disable-next-line no-useless-catch
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                query,

            )
        } catch (error) {
            throw error;
        }
    }

    //---------file upload service----------

    async uploadFile({file}){
        // eslint-disable-next-line no-useless-catch
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            );
        } catch (error) {
            throw error;
        }
    }

    async deleteFile(fileId){
        // eslint-disable-next-line no-useless-catch
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            throw error;
            // eslint-disable-next-line no-unreachable
            return false;
        }
    }
    getFile(fileId){
        return this.bucket.getFile(
            conf.appwriteBucketId,
            fileId,
        )
    }
}

const service = new Service;

export default service;