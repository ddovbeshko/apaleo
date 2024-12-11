import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Userscomponent } from './users.component';

describe('UserComponent', () => {
  let component: Userscomponent;
  let fixture: ComponentFixture<Userscomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Userscomponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Userscomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
