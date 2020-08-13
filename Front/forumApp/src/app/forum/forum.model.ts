interface ForumJson {
    name: string;
    posts: string[];
  }

export class Forum {
    constructor(
      private _name: string,
      private _posts = new Array<string>(),
    ) {}

    static fromJSON(json:ForumJson): Forum {
        const forum = new Forum(json.name, json.posts);
        return forum;
    }
  
    get name(): string {
      return this._name;
    }

    get posts():string[] {
        return this._posts;
    }
   
    addPost(content: string) {
      this._posts.push(content);
    }
  }