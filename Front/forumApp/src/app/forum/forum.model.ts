import { Post, PostJson } from './post.model';

interface ForumJson {
  id: number;
  naam: string;
  //posts: PostJson[];
}

export class Forum {
  private _id: number;
  constructor(
    private _name: string,
    //private _posts = new Array<Post>()
  ) {}

  static fromJSON(json:ForumJson): Forum {
      const forum = new Forum(json.naam/*, json.posts.map(Post.fromJSON)*/);
      forum._id = json.id;
      return forum;
  }

  toJSON(): ForumJson {
      return <ForumJson> {
          naam: this.name,
          //posts: this.posts.map(p => p.toJSON())
      };
  }

  get id(): number {
    return this._id;
  }
  get name(): string {
    return this._name;
  }
  /* get posts():Post[] {
      return this._posts;
  }
  
  addPost(content: string, username: string) {
    this._posts.push(new Post(content, username));
  } */
}