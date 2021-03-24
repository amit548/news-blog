class HttpException extends Error {
  constructor(
    public message: string,
    public status: number,
    public body?: any
  ) {
    super(message);
  }
}

export default HttpException;
