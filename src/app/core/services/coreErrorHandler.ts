
import {ErrorHandler, Injectable} from '@angular/core';

@Injectable()
export class CoreErrorHandler implements ErrorHandler{


  handleError(error: any): void {

    console.error('My Handler')
    throw error;
  }

}
