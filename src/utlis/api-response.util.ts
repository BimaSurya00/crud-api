export interface ApiResponse<T> {
  code: number;
  status: boolean;
  message: string;
  result?: T;
  error?: string;
}

export class ApiResponseUtil {
  static success<T>(
    data: T,
    message: string = "Success",
    code: number = 200
  ): ApiResponse<T> {
    return {
      code,
      status: true,
      message,
      result: data,
    };
  }

  static error(
    message: string,
    code: number = 400,
    error?: string
  ): ApiResponse<null> {
    return {
      code,
      status: false,
      message,
      error,
    };
  }

  static created<T>(
    data: T,
    message: string = "Created successfully"
  ): ApiResponse<T> {
    return {
      code: 201,
      status: true,
      message,
      result: data,
    };
  }

  static notFound(message: string = "Resource not found"): ApiResponse<null> {
    return {
      code: 404,
      status: false,
      message,
    };
  }
}
