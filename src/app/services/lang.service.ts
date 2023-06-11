import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LangService {
  private lang = new BehaviorSubject<any>(0);
  getLang() {
    return this.lang.asObservable();
  }
  setLang(newLang:any) {
    this.lang.next(newLang);
  }
}
