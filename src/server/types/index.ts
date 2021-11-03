export interface MySQL_Default_Response {
    insertId:number;  
    affectedRows: number;
}


export interface Authors {
    id?: number;
    name: string;
    email?: string;
    _created?: string 
}

export interface Tags {
    id?: number;
    name: string;
    _created?: string 
}

export interface Blogs {
    id?: number;
    title: string;
    content?: string;
    authorid: number;
    _created?: string;
    
}

export interface BlogTags {
    
    blogid: Blogs["id"];
    tagid: number   
}

export interface BlogTagsJoined {
    tag_id: number;
    tag_name: string;
    blog_id: number;
    title: string;
    content: string,
    blog_created: string;
    a_name: string;
    a_email: string;
    _created?: string;
}