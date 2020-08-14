import { Forum } from './forum.model';

export interface PostJson {
    inhoud: string;
    poster?: {
      userName: string;
    };
    repliesTo?: PostJson;
    forum: {
      id: number;
    }
}

export interface UserJson {
  userName: string;
}

export class User {
  constructor(
    private _username: string
  ) {}

  static fromJSON(json: UserJson): User {
    const usr = new User(json.userName);
    return usr;
  }

  toJSON(): UserJson {
    return <UserJson> {
        userName: this._username,
    };
  }

  get username(): string {
    return this._username;
  }
}

export class Post {
  private _user : User;
  private _forum : Forum;
  constructor(
    private _content: string,
    forumid: number,
    username?: string,
    private _repliesTo?: Post
  ) {
    this._user = new User(username);
    this._forum = new Forum('', forumid);
  }

  static fromJSON(json:PostJson): Post {
      const post = new Post(json.inhoud, json.forum.id, json.poster.userName, 
        json.repliesTo ? Post.fromJSON(json.repliesTo) : null);
      return post;
  }

  toJSON(): PostJson {
    return <PostJson> {
        inhoud: this._content,
        //poster: this._user.toJSON(),
        forum: this._forum.toJSONId()
    };
  }

  get content(): string {
    return this._content;
  }

  get username(): string {
    return this._user.username;
  }

  get repliesTo(): Post {
    return this._repliesTo;
  }
}