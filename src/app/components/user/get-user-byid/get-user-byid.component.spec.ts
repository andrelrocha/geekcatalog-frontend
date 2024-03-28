import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetUserByidComponent } from './get-user-byid.component';

describe('GetUserByidComponent', () => {
  let component: GetUserByidComponent;
  let fixture: ComponentFixture<GetUserByidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetUserByidComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetUserByidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
