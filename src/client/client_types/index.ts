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
    blogtag_id: number;
    _created?: string;
}

//You only need to join BlogTags and Tags

/*

SQL Join code (Tags JOIN BlogTags) - get_all for BlogTagsJoined

SELECT t.id as tag_id, t.name as tag_name, BT.blogid as blog_id, BT.tagid as blogtag_id, BT._created
FROM Tags t JOIN BlogTags BT
ON t.id = BT.tagid ORDER BY t._created DESC


*/