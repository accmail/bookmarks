export class Bookmark{
    Url: string;
    Title: string;
    Image: string;
    Description: string;
    DateCreated: number;

    constructor(url, title, image, description){
        this.Url = url;
        this.Title = title;
        this.Image = image;
        this.Description = description;
        this.DateCreated = new Date().getTime();
    }
}