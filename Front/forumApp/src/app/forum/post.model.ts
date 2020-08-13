export interface PostJson {
    inhoud: string;
  }

export class Post {
    constructor(
      private _content: string,
    ) {}

    static fromJSON(json:PostJson): Post {
        const post = new Post(json.inhoud);
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
  }