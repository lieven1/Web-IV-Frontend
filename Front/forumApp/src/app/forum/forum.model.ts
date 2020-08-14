interface ForumJson {
  id: number;
  naam: string;
  foraLidschappen: {
    gebruikerId: number;
  }[]
  //posts: PostJson[];
}

interface ForumLidJson {
  gebruikerId: number;
}

class ForumLid {
  constructor(
    private _gebruikerId: number
  ) {}

  static fromJSON(json: ForumLidJson): ForumLid {
    const fl = new ForumLid(json.gebruikerId);
    return fl;
  }

  toJSON(): ForumLidJson {
    return <ForumLidJson> {
      gebruikerId: this._gebruikerId,
    };
  }

  get gebruikerId(): string {
    return this.gebruikerId;
  }
}

export class Forum {
  constructor(
    private _name?: string,
    private _aantalLeden?: number,
    private _id?: number
    //private _posts = new Array<Post>()
  ) {}

  static fromJSON(json:ForumJson): Forum {
      const forum = new Forum(json.naam, json.foraLidschappen.length /*json.posts.map(Post.fromJSON)*/);
      forum._id = json.id;
      return forum;
  }

  toJSON(): ForumJson {
      return <ForumJson> {
          naam: this.name,
          //posts: this.posts.map(p => p.toJSON())
      };
  }

  toJSONId(): ForumJson {
    return <ForumJson> {
        id: this.id,
        //posts: this.posts.map(p => p.toJSON())
    };
}

  get id(): number {
    return this._id;
  }
  get name(): string {
    return this._name;
  }
  get aantal(): number {
    return this._aantalLeden;
  }
  /* get posts():Post[] {
      return this._posts;
  }
  
  addPost(content: string, username: string) {
    this._posts.push(new Post(content, username));
  } */
}