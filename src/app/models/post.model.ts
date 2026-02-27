export class Post {
  constructor(
    public id: number,
    public title: string,
    public content: string,
    public author: string,      // Keep as author for template compatibility
    public datePosted: Date
  ) { }
}
