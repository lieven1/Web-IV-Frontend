import { Forum } from './forum.model';

interface PostJson {
  id? : number
  inhoud: string;
  poster?: {
    userName: string,
    email: string
  };
  repliesTo?: PostJson;
  forum: {
    id: number;
  }
}

interface UserJson {
  userName: string;
  email: string;
}

class User {
  constructor(
    private _username: string,
    private _email: string
  ) {}

  static fromJSON(json: UserJson): User {
    const usr = new User(json.userName, json.email);
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
  get email(): string {
    return this._email;
  }
}

export class Post {
  private _id : number;
  private _user : User;
  private _forum : Forum;
  constructor(
    private _content: string,
    forumid: number,
    username?: string,
    email?: string,
    private _repliesTo?: Post
  ) {
    this._user = new User(username, email);
    this._forum = new Forum(null, null, forumid);
  }

  static fromJSON(json:PostJson): Post {
      const post = new Post(json.inhoud, json.forum.id, json.poster.userName, json.poster.email,
        json.repliesTo ? Post.fromJSON(json.repliesTo) : null);
      post._id = json.id;
      return post;
  }

  toJSON(): PostJson {
    return <PostJson> {
        inhoud: this._content,
        //poster: this._user.toJSON(),
        forum: this._forum.toJSONId()
    };
  }

  get id(): number {
    return this._id;
  }
  get content(): string {
    return this._content;
  }
  get user(): User {
    return this._user;
  }
  get repliesTo(): Post {
    return this._repliesTo;
  }
}