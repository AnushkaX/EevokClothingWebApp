export class Request {
    key: string;
    description: string;
    url: string;
    file: File;
  
    constructor(file: File) {
      this.file = file;
    }
  }