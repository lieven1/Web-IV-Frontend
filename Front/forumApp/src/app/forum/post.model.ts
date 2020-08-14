export interface PostJson {
    inhoud: string;
    poster: {
      userName: string;
    };
    repliesTo?: PostJson;
}

export class Post {
  constructor(
    private _content: string,
    private _username: string,
    private _repliesTo: Post
  ) {}

  static fromJSON(json:PostJson): Post {
      const post = new Post(json.inhoud, json.poster.userName, json.repliesTo ? Post.fromJSON(json.repliesTo) : null);
      return post;
  }

  toJSON(): PostJson {
    return <PostJson> {
        inhoud: this._content
    };
  }

  get content(): string {
    return this._content;
  }

  get username(): string {
    return this._username;
  }

  get repliesTo(): Post {
    return this._repliesTo;
  }
}