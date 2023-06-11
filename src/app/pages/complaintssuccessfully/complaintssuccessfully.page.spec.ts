import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ComplaintssuccessfullyPage } from './complaintssuccessfully.page';

describe('ComplaintssuccessfullyPage', () => {
  let component: ComplaintssuccessfullyPage;
  let fixture: ComponentFixture<ComplaintssuccessfullyPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintssuccessfullyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ComplaintssuccessfullyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
